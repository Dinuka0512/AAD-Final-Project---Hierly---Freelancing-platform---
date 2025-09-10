package com.hierly.back_end.util;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Base64;

public class PasswordEncryptor {

    private static final String ALGO = "AES";
    // AES needs a 16/24/32 byte key → here we use 16
    private static final byte[] keyValue = "MySuperSecretKey".getBytes(); // 16 chars

    // Encrypt plain password
    public static String encrypt(String plainPassword) {
        try {
            Key key = generateKey();
            Cipher cipher = Cipher.getInstance(ALGO);
            cipher.init(Cipher.ENCRYPT_MODE, key);
            byte[] encVal = cipher.doFinal(plainPassword.getBytes());
            return Base64.getEncoder().encodeToString(encVal);
        } catch (Exception e) {
            throw new RuntimeException("Error while encrypting password", e);
        }
    }

    // Decrypt back to original password
    public static String decrypt(String encryptedPassword) {
        try {
            Key key = generateKey();
            Cipher cipher = Cipher.getInstance(ALGO);
            cipher.init(Cipher.DECRYPT_MODE, key);
            byte[] decodedValue = Base64.getDecoder().decode(encryptedPassword);
            byte[] decValue = cipher.doFinal(decodedValue);
            return new String(decValue);
        } catch (Exception e) {
            throw new RuntimeException("Error while decrypting password", e);
        }
    }

    // Generate AES key
    private static Key generateKey() {
        return new SecretKeySpec(keyValue, ALGO);
    }
}