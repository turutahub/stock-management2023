package com.example.demo.service;

import org.springframework.stereotype.Service;
@Service
public class GenerateSessionId {
    public static final String NUM     = "0123456789";
    public static final String ALPHA_L = "abcdefghijklmnopqrstuvwxyz";
    public static final String ALPHA_U = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    public static String randomString(int count, String base){
        String result = "";

        java.util.Random ran = new java.util.Random();

        for(int i = 0; i < count; i++){
            int pos = ran.nextInt(base.length());
            result += base.charAt(pos);
        }
        return result;
    }
}


