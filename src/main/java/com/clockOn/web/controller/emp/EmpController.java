package com.clockOn.web.controller.emp;

import java.io.File;
import java.io.IOException;
import java.security.Principal;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import com.clockOn.web.dao.MemberDAO;
import com.clockOn.web.entity.member.Member;
import com.clockOn.web.entity.member.MemberProfile;
import com.clockOn.web.service.attendance.CommuteService;
import com.clockOn.web.service.empManagement.MemberService;
import com.clockOn.web.service.vacation.LeaveService;

import lombok.Setter;



@Controller
@RequestMapping("/emp/") //localhost ~ /emp/login_emp
public class EmpController {
	
	@Setter(onMethod_ = { @Autowired })
	private MemberDAO memberMapper;
	
	@Autowired
	private MemberService memberService;
	
	@Autowired
	private LeaveService leaveService;
	
	@Autowired
	private ServletContext ctx;

	@Autowired
	private CommuteService commuteService;
	
	@GetMapping("main")
	public String emp_main(Principal principal, HttpSession session, Model model) {
		String username = principal.getName();
		/*
		 * model.addAttribute("thisMonthCount",commuteService.thisMonthWork(username));
		 * model.addAttribute("thisMonthLate", commuteService.thisMonthLate(username));
		 * model.addAttribute("thisMonthHoli", commuteService.thisMonthHoli(username));
		 * model.addAttribute("thisMonthTime", commuteService.thisMonthTime(username));
		 * model.addAttribute("thisMonthAbsent",commuteService.thisMonthAbsent(username)
		 * ); model.addAttribute("thisYearCount",
		 * commuteService.thisYearWork(username)); model.addAttribute("thisYearLate",
		 * commuteService.thisYearLate(username)); model.addAttribute("thisYearHoli",
		 * commuteService.thisYearHoli(username)); model.addAttribute("thisYearTime",
		 * commuteService.thisYearTime(username));
		 * model.addAttribute("thisYearAbsent",commuteService.thisYearAbsent(username));
		 * model.addAttribute("annday", leaveService.getVacinfo(username));
		 */
		if(session.getAttribute("level")==null || !session.getAttribute("level").equals("ROLE_MEMBER")) {
			
			Member member= memberMapper.read(username);
	        session.setAttribute("level", member.getEmp_level());
	        session.setAttribute("id", member.getEmp_id());
	        session.setAttribute("name", member.getEmp_name());
		}
		
		return "emp.main";
	}
	
	@GetMapping("infoUpdate") //?????? ??
	public String infoUpdate(String emp_id, Model model) {
		model.addAttribute("updateProfile", memberService.profile(emp_id));
		return "emp.infoUpdate";
	}
	
	@PostMapping("infoUpdate") //?????? ?? (form action) 
	public String infoUpdate(String emp_id, String emp_pw, String emp_email, String emp_tel, MultipartFile emp_pic) throws IllegalStateException, IOException {
		//null???? ?????????? MemberDAOMapper.xml > ?????????? ????????
		String fileName = emp_pic.getOriginalFilename();
		if(fileName !=null && fileName !="") {
		//??????????
			String webPath = "/static/images";
			String realPath = ctx.getRealPath(webPath);
			File savePath = new File(realPath);
			System.out.println("????????2" + savePath);
			if (!savePath.exists())
				savePath.mkdirs();
			realPath += File.separator + fileName;
			File saveFile = new File(realPath);
			System.out.println("????????1" + realPath);
			emp_pic.transferTo(saveFile);
		}
		
		MemberProfile memberProfile = new MemberProfile(emp_id, emp_pw, emp_email, emp_tel, fileName);
		
		System.out.println("?????? ?????? ??:" + memberService.infoUpdate(memberProfile));
		
		return "emp.main"; 

	}
	
	@PostMapping("hiSuccess")
	public void hiSuccess(String emp_id, HttpServletResponse response) throws IOException {

		commuteService.hiSuccess(emp_id);

		response.sendRedirect("/emp/main");
	}

	@GetMapping("calendar") // ?????? ??
	public String calendar() {
		return "emp.timeRecord.byCalendar";
	}
}
