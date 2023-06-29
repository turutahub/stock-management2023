package com.example.demo.datasource;

import com.example.demo.controller.inspect.InspectRequest;
import com.example.demo.controller.inventory.InventoryRequest;
import com.example.demo.controller.order.OrderRequest;
import com.example.demo.controller.stock.StockRequest;
import com.example.demo.model.*;
import com.example.demo.repository.MainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.websocket.OnError;
import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Repository
public class MainDataSource implements MainRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;

    /* 食材登録 */
    @Override
    public List<RegisterModel> getAllFood() {
        String sql = "SELECT * FROM food_mst";
        List<Map<String, Object>> records = jdbcTemplate.queryForList(sql);
        return records.stream().map(this::toRegisterModel).collect(Collectors.toList());
    }
    @Override
    public void registerFood(RegisterModel model) {
        String sql = "INSERT INTO food_mst(food_name, unit, cost, expdays, supplier, note) VALUES (?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(
                sql,
                model.getFoodName(),
                model.getUnit(),
                model.getCost(),
                model.getExpDays(),
                model.getSupplier(),
                model.getNote()
        );
    }
    @Override
    public RegisterModel getById(int foodId) {
        String sql = "SELECT * FROM food_mst WHERE food_id = ?";
        List<Map<String, Object>> record = jdbcTemplate.queryForList(sql, foodId);
        return toRegisterModel(record.get(0));
    }
    @Override
    public void updateFood(RegisterModel model) {
        String sql = "UPDATE food_mst SET food_name = ?, unit = ?, cost = ?, expdays = ?, supplier = ?, note= ? WHERE food_id = ?";
        jdbcTemplate.update(
                sql,
                model.getFoodName(),
                model.getUnit(),
                model.getCost(),
                model.getExpDays(),
                model.getSupplier(),
                model.getNote(),
                model.getFoodId()
        );
    }
    @Override
    public void deleteFood(int foodId) {
        String sql = "DELETE FROM food_mst WHERE food_id = ?";
        jdbcTemplate.update(sql, foodId);
    }

    private RegisterModel toRegisterModel(Map<String, Object> record) {
        return new RegisterModel(
                (int) record.get("food_id"),
                (String) record.get("food_name"),
                (String) record.get("unit"),
                (int) record.get("cost"),
                (int) record.get("expdays"),
                (String) record.get("supplier"),
                (String) record.get("note")
        );
    }


    /* 発注 */
    @Override//impire_historyレコード全表示(food_mst結合)
    public List<OrderModel> getAllOrder() {
        String sql = "SELECT *\n" +
                "FROM impire_history imp\n" +
                "LEFT JOIN food_mst fm ON imp.food_id = fm.food_id";
        List<Map<String, Object>> records = jdbcTemplate.queryForList(sql);
        return records.stream().map(this::toOrderModel).collect(Collectors.toList());
    }
    @Override//dayカラムに今日の日付が入っているfood_id(impire_history参照)を除いたfood_idをfood_mstから表示
    public List<RegisterModel> getUnordered() {
        String sql = "SELECT *\n" +
                "FROM food_mst\n" +
                "WHERE food_id NOT IN (SELECT food_id FROM impire_history WHERE day = CURRENT_DATE)";
        List<Map<String, Object>> records = jdbcTemplate.queryForList(sql);
        return records.stream().map(this::toRegisterModel).collect(Collectors.toList());
    }
    @Override
    public void insertOrder(OrderRequest request) {
        String sql = "INSERT INTO impire_history (food_id, day, imp_num, delivery_day) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(
                sql,
                request.getFoodId(),
                request.getDay(),
                request.getImpNum(),
                request.getDeliveryDay()
        );
    }
    @Override//チェックされたレコードのfoodIdとdayを受け取り、その値を持つレコードをimpire_historyより取得
    public OrderModel getCheckedOrder(int foodId, LocalDate day) {
        String sql = "SELECT *\n" +
                "FROM impire_history imp\n" +
                "LEFT JOIN food_mst fm ON imp.food_id = fm.food_id\n" +
                "WHERE imp.food_id = ? AND imp.day = ?";
        List<Map<String, Object>> record = jdbcTemplate.queryForList(sql, foodId, day);
        return toOrderModel(record.get(0));
    }
    @Override
    public void updateOrder(OrderRequest request) {
        String sql = "UPDATE impire_history SET imp_num = ?, delivery_day = ? WHERE food_id = ? AND day = ?";
        jdbcTemplate.update(
                sql,
                request.getImpNum(),
                request.getDeliveryDay(),
                request.getFoodId(),
                request.getDay()
        );
    }
    private OrderModel toOrderModel(Map<String, Object> record) {
        Date day = (Date) record.get("day");
        Date deliveryDay = (Date) record.get("delivery_day");
        return new OrderModel(
                (int) record.get("food_id"),
                day.toLocalDate(),
                (String) record.get("food_name"),
                (String) record.get("unit"),
                (int) record.get("cost"),
                (int) record.get("expdays"),
                (String) record.get("supplier"),
                (String) record.get("note"),
                (int) record.get("imp_num"),
                deliveryDay.toLocalDate()
        );
    }


    /* 検品 */
    @Override//inspection_historyレコード全表示(food_mst、impire_history結合)
    public List<InspectModel> getAllInspection() {
        String sql = "SELECT ins.day AS inspection_day, imp.day AS impire_day, *\n" +
                "FROM inspection_history ins\n" +
                "LEFT JOIN food_mst fm ON ins.food_id = fm.food_id\n" +
                "LEFT JOIN impire_history imp ON ins.food_id = imp.food_id AND ins.day = imp.delivery_day";
        List<Map<String, Object>> records = jdbcTemplate.queryForList(sql);
        return records.stream().map(this::toInspectModel).collect(Collectors.toList());
    }
    @Override//inspection_historyからfood_idとdayの組み合わせを取得し、その組み合わせ以外のレコードをimpire_historyから取得する
    public List<OrderModel> getUnInspected() {
        String sql = "SELECT *\n" +
                "FROM impire_history imp\n" +
                "LEFT JOIN food_mst fm ON imp.food_id = fm.food_id\n" +
                "WHERE (imp.food_id, imp.delivery_day) NOT IN (SELECT food_id, day FROM inspection_history)";
        List<Map<String, Object>> records = jdbcTemplate.queryForList(sql);
        return records.stream().map(this::toOrderModel).collect(Collectors.toList());

    }
    @Override
    public void insertInspection(InspectRequest request) {
        String sql = "INSERT INTO inspection_history (food_id, day, ins_num, ins_insufficient) VALUES(?, ?, ?, ?)";
        jdbcTemplate.update(
                sql,
                request.getFoodId(),
                request.getDay(),
                request.getInsNum(),
                request.getInsInsufficient()
        );
    }
    @Override//チェックされたレコードのfoodIdとdayを受け取り、その値を持つレコードをinspection_historyより取得
    public InspectModel getCheckedInspection(int foodId, LocalDate day) {
        String sql = "SELECT ins.day AS inspection_day, imp.day AS impire_day, *\n" +
                "FROM inspection_history ins\n" +
                "LEFT JOIN food_mst fm ON ins.food_id = fm.food_id\n" +
                "LEFT JOIN impire_history imp ON ins.food_id = imp.food_id AND ins.day = imp.delivery_day\n" +
                "WHERE ins.food_id = ? AND imp.day = ?";
        List<Map<String, Object>> record = jdbcTemplate.queryForList(sql, foodId, day);
        return toInspectModel(record.get(0));
    }
    @Override
    public void updateInspection(InspectRequest request) {
        String sql = "UPDATE inspection_history SET ins_num = ?, ins_insufficient = ? WHERE food_id = ? AND day = ?";
        jdbcTemplate.update(
                sql,
                request.getInsNum(),
                request.getInsInsufficient(),
                request.getFoodId(),
                request.getDay()
        );
    }
    @Override
    public LocalDate getByIdDeliveryDay(int foodId, LocalDate day) {
        String sql = "SELECT delivery_day FROM impire_history WHERE food_id = ? AND day = ?";
        return jdbcTemplate.queryForObject(sql, LocalDate.class, foodId, day);
    }
    @Override
    public int getByIdInsNum(int foodId, LocalDate DeliveryDay) {
        String sql = "SELECT ins_num FROM inspection_history WHERE food_id = ? AND day = ?";
        return jdbcTemplate.queryForObject(sql, int.class, foodId, DeliveryDay);
    }
    @Override
    public void updateIns(int insNum, int insInsufficient, int foodId, LocalDate DeliveryDay) {
        String sql = "UPDATE inspection_history SET ins_num = ?, ins_insufficient = ? WHERE food_id = ? AND day = ?";
        jdbcTemplate.update(
                sql,
                insNum,
                insInsufficient,
                foodId,
                DeliveryDay
        );
    }
    private InspectModel toInspectModel(Map<String, Object> record) {
        Date impDay = (Date) record.get("impire_day");
        Date insDay = (Date) record.get("inspection_day");
        return new InspectModel(
                (int) record.get("food_id"),
                (String) record.get("food_name"),
                (String) record.get("unit"),
                (int) record.get("cost"),
                (int) record.get("expdays"),
                (String) record.get("supplier"),
                (String) record.get("note"),
                (int) record.get("imp_num"),
                impDay.toLocalDate(),
                (int) record.get("ins_num"),
                (int) record.get("ins_insufficient"),
                insDay.toLocalDate()
        );
    }


    /* 棚卸し */
    @Override//今日の日付を持つレコードをinventory_historyから表示
    public List<InventoryModel> getAllInventory(LocalDate day) {
        String sql = "SELECT fm.cost AS food_cost, stk.cost AS stock_cost, *\n" +
                "FROM inventory_history inv\n" +
                "LEFT JOIN food_mst fm ON inv.food_id = fm.food_id\n" +
                "LEFT JOIN stock_history stk ON inv.food_id = stk.food_id AND inv.day = stk.day\n" +
                "WHERE inv.day = ?";
        List<Map<String, Object>> records = jdbcTemplate.queryForList(sql, day);
        return records.stream().map(this::toInventoryModel).collect(Collectors.toList());
    }
    private InventoryModel toInventoryModel(Map<String, Object> record) {
        Date day = (Date) record.get("day");
        return new InventoryModel(
                (int) record.get("food_id"),
                day.toLocalDate(),
                (String) record.get("food_name"),
                (int) record.get("expdays"),
                (int) record.get("stock"),
                (int) record.get("spplm_num"),
                (int) record.get("spplm_amt"),
                (int) record.get("waste_num"),
                (int) record.get("consumed_num"),
                (int) record.get("waste_amt"),
                (BigDecimal) record.get("loss_rate"),
                (int) record.get("stock_cost"),
                (int) record.get("food_cost"),
                (int) record.get("required_num"),
                (int) record.get("insufficient_num")
        );
    }
    @Override//今日の日付を持つレコードをinventory_historyから表示
    public List<InventoryModel> getDoneInventory() {
        String sql = "SELECT fm.cost AS food_cost, stk.cost AS stock_cost, *\n" +
                "FROM inventory_history inv\n" +
                "LEFT JOIN food_mst fm ON inv.food_id = fm.food_id\n" +
                "LEFT JOIN stock_history stk ON inv.food_id = stk.food_id AND inv.day = stk.day\n" +
                "WHERE inv.day = CURRENT_DATE";
        List<Map<String, Object>> records = jdbcTemplate.queryForList(sql);
        return records.stream().map(this::toInventoryModel).collect(Collectors.toList());
    }
    @Override//inventory_historyの今日の日付を持つfood_id以外のものをfood_mstから表示
    public List<RegisterModel> getUnInventoried() {
        String sql = "SELECT DISTINCT fm.*\n" +
                "FROM food_mst fm\n" +
                "WHERE fm.food_id NOT IN (SELECT food_id FROM inventory_history WHERE day = CURRENT_DATE)";
        List<Map<String, Object>> records = jdbcTemplate.queryForList(sql);
        return records.stream().map(this::toRegisterModel).collect(Collectors.toList());
    }
    @Override//本日の検品数を表示(複数あった場合は合計)
    public int getTodayInsNum(int foodId) {
        String sql = "SELECT SUM(ins.ins_num) AS total_ins_num\n" +
                "FROM inspection_history ins\n" +
                "LEFT JOIN impire_history imp ON ins.food_id = imp.food_id AND ins.day = imp.day\n" +
                "WHERE imp.delivery_day = CURRENT_DATE AND imp.food_id = ?";
        return jdbcTemplate.queryForObject(sql, int.class, foodId);
    }

    @Override
    public List<InformationModel> getInfo(LocalDate day) {
        String sql = "SELECT * FROM informations_history WHERE day = ?";
        List<Map<String, Object>> records = jdbcTemplate.queryForList(sql, day);
        return records.stream().map(this::toInformationModel).collect(Collectors.toList());
    }

    private InformationModel toInformationModel(Map<String, Object> record) {
        Date day = (Date) record.get("day");
        return new InformationModel(
                day.toLocalDate(),
                (int) record.get("cost"),
                (BigDecimal) record.get("cost_rate"),
                (int) record.get("waste_amt"),
                (BigDecimal) record.get("loss_rate"),
                (int) record.get("sales"),
                (int) record.get("balance")
        );
    }

    @Override
    public void insertInventory(InventoryRequest request) {
        String sql = "INSERT INTO inventory_history (food_id, day, spplm_num, spplm_amt, waste_num) VALUES (?, ?, ?, ?, ?)";
        jdbcTemplate.update(
                sql,
                request.getFoodId(),
                request.getDay(),
                request.getSpplmNum(),
                request.getSpplmAmt(),
                request.getWasteNum()
        );
    }
    @Override
    public void updateInventory(InventoryRequest request) {
        String sql = "UPDATE inventory_history SET spplm_num = ?, spplm_amt = ?, waste_num = ? WHERE food_id = ? AND day = ?";
        jdbcTemplate.update(
                sql,
                request.getSpplmNum(),
                request.getSpplmAmt(),
                request.getWasteNum(),
                request.getFoodId(),
                request.getDay()
        );
    }
    @Override
    public void insertInfo(InformationModel model) {
        String sql = "INSERT INTO informations_history (day, cost, cost_rate, waste_amt, loss_rate, sales, balance) VALUES (?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(
                sql,
                model.getDay(),
                model.getCost(),
                model.getCostRate(),
                model.getWasteAmt(),
                model.getLossRate(),
                model.getSales(),
                model.getBalance()
        );
    }
    @Override
    public void updateInfo(InformationModel model) {
        String sql = "UPDATE informations_history SET cost = ?, cost_rate = ?, waste_amt = ?, loss_rate = ?, sales = ?, balance = ? WHERE day = ?";
        jdbcTemplate.update(
                sql,
                model.getCost(),
                model.getCostRate(),
                model.getWasteAmt(),
                model.getLossRate(),
                model.getSales(),
                model.getBalance(),
                model.getDay()
        );
    }


    /* 在庫一覧 */
    @Override//impire_historyのfood_idごとに最新のdayを持つレコードを抽出し、impとする
    public List<StockModel> getAllStock() {
        String sql = "SELECT imp.day AS imp_day, stk.day AS stk_day, *\n" +
                "FROM (SELECT * FROM impire_history WHERE (food_id, day) IN (\n" +
                "SELECT food_id, MAX(day) FROM impire_history GROUP BY food_id)) imp\n" +
                "LEFT JOIN stock_history stk ON imp.food_id = stk.food_id\n" +
                "LEFT JOIN food_mst fm ON imp.food_id = fm.food_id\n" +
                "WHERE stk.day = CURRENT_DATE";
        List<Map<String, Object>> records = jdbcTemplate.queryForList(sql);
        return records.stream().map(this::toStockModel).collect(Collectors.toList());
    }
    private StockModel toStockModel(Map<String, Object> record) {
        Date day = (Date) record.get("imp_day");
        Date deliveryDay = (Date) record.get("delivery_day");
        return new StockModel(
                (int) record.get("food_id"),
                day.toLocalDate(),
                (String) record.get("food_name"),
                (int) record.get("insufficient_num"),
                (int) record.get("imp_num"),
                deliveryDay.toLocalDate(),
                (int) record.get("stock"),
                (int) record.get("required_num"),
                (int) record.get("expdays")
        );
    }
    @Override
    public int getPastConsumedNum(int foodId, LocalDate day) {
        String sql = "SELECT consumed_num FROM stock_history WHERE food_id = ? AND day = ?";
        return jdbcTemplate.queryForObject(sql, int.class, foodId, day);
    }
    @Override
    public void insertStock(StockRequest request) {
        String sql = "INSERT INTO stock_history (food_id, day, stock, consumed_num, insufficient_num, required_num, cost, waste_amt, loss_rate) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(
                sql,
                request.getFoodId(),
                request.getDay(),
                request.getStock(),
                request.getConsumedNum(),
                request.getInsufficientNum(),
                request.getRequiredNum(),
                request.getCost(),
                request.getWasteAmt(),
                request.getLossRate()
        );
    }
    @Override
    public void updateStock(StockRequest request) {
        String sql = "UPDATE stock_history SET stock = ?, consumed_num = ?, insufficient_num = ?, required_num = ?, cost = ?, waste_amt = ?, loss_rate = ? WHERE food_id = ? AND day = ?";
        jdbcTemplate.update(
                sql,
                request.getStock(),
                request.getConsumedNum(),
                request.getInsufficientNum(),
                request.getRequiredNum(),
                request.getCost(),
                request.getWasteAmt(),
                request.getLossRate(),
                request.getFoodId(),
                request.getDay()
        );
    }

    /* 検索機能 */
    @Override
    public List<InformationModel> searchInformation(LocalDate startDate, LocalDate endDate) {
        String sql = "SELECT * FROM informations_history WHERE day BETWEEN ? AND ?";
        List<Map<String, Object>> records = jdbcTemplate.queryForList(sql, startDate, endDate);
        return records.stream().map(this::toInformationModel).collect(Collectors.toList());
    }

    @Override
    public List<SearchStockModel> searchStock(LocalDate startDate, LocalDate endDate) {
        String sql = "SELECT *\n" +
                "FROM stock_history stk\n" +
                "LEFT JOIN food_mst fm ON stk.food_id = fm.food_id\n" +
                "WHERE day BETWEEN ? AND ?";
        List<Map<String, Object>> records = jdbcTemplate.queryForList(sql, startDate, endDate);
        return records.stream().map(this::toSearchStockModel).collect(Collectors.toList());
    }

    private SearchStockModel toSearchStockModel(Map<String, Object> record) {
        Date day = (Date) record.get("day");
        return new SearchStockModel(
                (int) record.get("food_id"),
                (String) record.get("food_name"),
                day.toLocalDate(),
                (int) record.get("cost"),
                (int) record.get("waste_amt"),
                (BigDecimal) record.get("loss_rate"),
                (int) record.get("consumed_num")
        );
    }

    @Override
    public List<OrderModel> searchOrder(LocalDate startDate, LocalDate endDate) {
        String sql = "SELECT *\n" +
                "FROM impire_history imp\n" +
                "LEFT JOIN food_mst fm ON imp.food_id = fm.food_id\n" +
                "WHERE day BETWEEN ? AND ?";
        List<Map<String , Object>> records = jdbcTemplate.queryForList(sql, startDate, endDate);
        return records.stream().map(this::toOrderModel).collect(Collectors.toList());
    }

    @Override
    public List<SearchInventoryModel> searchInventory(LocalDate startDate, LocalDate endDate) {
        String sql = "SELECT *\n" +
                "FROM inventory_history inv\n" +
                "LEFT JOIN food_mst fm ON inv.food_id = fm.food_id\n" +
                "WHERE day BETWEEN ? AND ?";
        List<Map<String, Object>> records = jdbcTemplate.queryForList(sql, startDate, endDate);
        return records.stream().map(this::toSearchInventoryModel).collect(Collectors.toList());
    }

    private SearchInventoryModel toSearchInventoryModel(Map<String, Object> record) {
        Date day = (Date) record.get("day");
        return new SearchInventoryModel(
                (int) record.get("food_id"),
                (String) record.get("food_name"),
                day.toLocalDate(),
                (int) record.get("waste_num"),
                (int) record.get("spplm_num"),
                (int) record.get("spplm_amt")
        );
    }
}
