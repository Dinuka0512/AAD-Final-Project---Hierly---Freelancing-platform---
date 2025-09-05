package com.hierly.back_end.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.apache.catalina.security.SecurityConfig;
import org.springframework.stereotype.Component;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JWTUtil {
    private final SecretKey secretKey;

    public JWTUtil() {
        try {
            SecretKey key = KeyGenerator.getInstance("HmacSHA256").generateKey();
            this.secretKey = Keys.hmacShaKeyFor(key.getEncoded());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public String generateJWTToken(String userName) {
        return Jwts.builder()
                .setSubject(userName)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) //Expiration after 1 hour
                .signWith(secretKey)
                .compact();
    }

    public String getUserFromJWTToken(String jwtToken) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)   // provide your key
                .build()
                .parseClaimsJws(jwtToken)   // parse and validate
                .getBody()
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token);
            return true;

        } catch (ExpiredJwtException e) {
            System.out.println("Token expired");
        } catch (SignatureException e) {
            System.out.println("Invalid signature");
        } catch (MalformedJwtException e) {
            System.out.println("Invalid token format");
        } catch (Exception e) {
            System.out.println("Token invalid: " + e.getMessage());
        }
        return false;
    }
}
