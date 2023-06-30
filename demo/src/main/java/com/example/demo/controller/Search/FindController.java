package com.example.demo.controller.Search;

import com.example.demo.model.*;
import com.example.demo.service.MainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.naming.directory.SearchResult;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/search")
public class FindController {
    private final MainService service;

    public FindController(MainService service) {
        this.service = service;
    }

    @GetMapping(value = "/info", produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public List<InformationModel> searchInformation(@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate) {
        return service.searchInformation(LocalDate.parse(startDate), LocalDate.parse(endDate));
    }

    @GetMapping(value = "/stock", produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public List<SearchStockModel> searchStock(@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate) {
        return service.searchStock(LocalDate.parse(startDate), LocalDate.parse(endDate));
    }

    @GetMapping(value = "/order", produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public List<OrderModel> searchOrder(@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate) {
        return service.searchOrder(LocalDate.parse(startDate), LocalDate.parse(endDate));
    }

    @GetMapping(value = "/inv", produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public List<SearchInventoryModel> searchInventory(@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate) {
        return service.searchInventory(LocalDate.parse(startDate), LocalDate.parse(endDate));
    }

    @GetMapping(value = "/food", produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public List<RegisterModel> searchFood(@RequestParam("keyword") String keyword) {
        return service.searchFood(keyword);
    }

    @GetMapping(value = "/food/part", produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public List<RegisterModel> searchFoodByPartialMatch(@RequestParam("keyword") String keyword) {
        return service.searchFoodByPartialMatch(keyword);
    }

    /*
    public class SearchController {
        @Autowired
        private Database1Service database1Service;

        @Autowired
        private Database2Service database2Service;

        @GetMapping("/search")
        public List<SearchResult> search(@RequestParam("keyword") String keyword) {
            // データベース1からキーワードに一致するデータを検索
            List<SearchResult> results1 = database1Service.search(keyword);

            // データベース2からキーワードに一致するデータを検索
            List<SearchResult> results2 = database2Service.search(keyword);

            // 検索結果を結合して返す
            List<SearchResult> combinedResults = new ArrayList<>();
            combinedResults.addAll(results1);
            combinedResults.addAll(results2);

            return combinedResults;
        }
    }
     */
}
