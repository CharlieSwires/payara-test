//package com.charlie.payara_test;
//
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.ControllerAdvice;
//import org.springframework.web.bind.annotation.ExceptionHandler;
//import org.springframework.web.context.request.WebRequest;
//
//@ControllerAdvice
//public class GlobalExceptionHandler {
//
//    // Handle specific exceptions
//    @ExceptionHandler(RuntimeException.class)
//    public ResponseEntity<String> handleRuntimeException(RuntimeException ex, WebRequest request) {
//        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_ACCEPTABLE);
//    }
//
//    // Handle all other exceptions
//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<String> handleGlobalException(
//            Exception ex, WebRequest request) {
//        return new ResponseEntity<>("An error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
//    }
//}
