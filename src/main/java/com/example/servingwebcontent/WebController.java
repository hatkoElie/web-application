package com.example.servingwebcontent;

import java.io.IOException;
import com.google.zxing.WriterException;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class WebController {

	@GetMapping("/qr")
	public String qrPage(Model model){
		model.addAttribute("qr", new Form());
		return "qr";
	}

	@PostMapping("/qr")
	public String submitQrPage(@ModelAttribute Form form){
		return "result";
	}

	@GetMapping(
		value = "/result",
		produces = MediaType.APPLICATION_OCTET_STREAM_VALUE
	)
	public @ResponseBody byte[] getFile() throws IOException {
		GenerateQRCode qr = new GenerateQRCode();
		
    	InputStream in = getClass()	
    		.getResourceAsStream(qr.generate(form.getContent()););
    return IOUtils.toByteArray(in);
}
}