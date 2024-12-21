package com.pharmacymanagement.backend.exception;

import org.springframework.web.bind.annotation.ExceptionHandler;

public class GlobalExceptionHandler extends RuntimeException {

    @ExceptionHandler(InvalidDataException.class)
    public String invalidDataException(InvalidDataException ide) {
       return ide.getMessage();
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public String resourceNotFoundException(ResourceNotFoundException rnfe) {
       return rnfe.getMessage();
    }

    @ExceptionHandler(AppException.class)
    public String handleGeneralException(AppException ae) {
       return "Lỗi không mong muốn" + ae.getMessage();
    }
  }
