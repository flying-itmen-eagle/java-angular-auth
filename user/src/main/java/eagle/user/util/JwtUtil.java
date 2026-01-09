package eagle.user.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.function.Function;

@Component
public class JwtUtil {

    // 為了示範方便，我們先將密鑰寫死在這裡。
    // 注意：密鑰長度必須至少 32 bytes (256 bits) 以符合 HMAC-SHA 演算法的安全要求。
    // 在正式環境中，這應該放在 application.properties 中讀取。
    private static final String SECRET_KEY = "YourSuperSecretKeyForJwtTokenGenerationWhichIsLongEnough";
    
    // Token 有效期：24 小時 (毫秒)
    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 24;

    // 取得簽章用的 Key 物件
    private SecretKey getSignInKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
    }

    // 1. 產生 Token
    public String generateToken(String username) {
        return Jwts.builder()
                .subject(username) // 設定 Token 主題 (通常是使用者名稱)
                .issuedAt(new Date(System.currentTimeMillis())) // 發行時間
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME)) // 到期時間
                .signWith(getSignInKey()) // 簽名
                .compact();
    }

    // 2. 從 Token 取出使用者名稱 (Username)
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // 3. 驗證 Token 是否有效
    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        // 驗證使用者名稱是否相符，且 Token 尚未過期
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    // 輔助方法：取出特定 Claim
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // 輔助方法：解析 Token 取得所有 Claims
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSignInKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    // 輔助方法：檢查 Token 是否過期
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // 輔助方法：取出到期時間
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
}
