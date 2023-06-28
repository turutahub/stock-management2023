package com.example.demo.controller.Search;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.naming.directory.SearchResult;
import java.util.List;

/*public class FindController {
    @RestController
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
}*/
