package com.pharmacymanagement.backend.service;

import com.pharmacymanagement.backend.model.Products;
import com.pharmacymanagement.backend.repository.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductsService {

    @Autowired
    private ProductsRepository productsRepository;

    // Lấy tất cả sản phẩm
    public List<Products> getAllProducts() {
        return productsRepository.findAll();
    }

    // Lấy sản phẩm theo ID
    public Products getProductById(int id) {
        Optional<Products> product = productsRepository.findById(id);
        return product.orElse(null);
    }

    // Tạo mới sản phẩm
    public Products createProduct(Products product) {
        return productsRepository.save(product);
    }

    // Cập nhật thông tin sản phẩm
    public Products updateProduct(int id, Products productDetails) {
        Optional<Products> product = productsRepository.findById(id);
        if (product.isPresent()) {
            Products existingProduct = product.get();
            existingProduct.setMedicineName(productDetails.getMedicineName());
            existingProduct.setTreat(productDetails.getTreat());
            existingProduct.setQuantity(productDetails.getQuantity());
            existingProduct.setExpDate(productDetails.getExpDate());
            existingProduct.setMedicineType(productDetails.getMedicineType());
            existingProduct.setEntryDate(productDetails.getEntryDate());
            existingProduct.setImageUrl(productDetails.getImageUrl());
            existingProduct.setPrice(productDetails.getPrice());
            return productsRepository.save(existingProduct);
        }
        return null;
    }

    // Xóa sản phẩm theo ID
    public void deleteProduct(int id) {
        productsRepository.deleteById(id);
    }
}
