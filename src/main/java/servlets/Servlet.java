package servlets;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import orgr.Main;

import java.io.IOException;
@SpringBootApplication
public class Servlet extends HttpServlet {

        public static void main(String[] args) {
            SpringApplication.run(orgr.Main.class, args);
        }
}
