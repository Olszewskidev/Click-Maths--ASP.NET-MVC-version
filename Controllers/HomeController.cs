using ClickMathsMVC.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ClickMathsMVC.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Quizs10()
        {
            return View(Get10Quizs());
        }
        IEnumerable<CMQuiz> Get10Quizs()
        {
            using(DBModel db=new DBModel())
            {
               return db.CMQuiz.ToList<CMQuiz>();
            }
        }
        public ActionResult AddNew(int id=0)
        {
            CMQuiz CM = new CMQuiz();
            return View(CM);
        }
        [HttpPost]
        public ActionResult AddQuiz(CMQuiz cm)
        {
            if (cm.ImgExample != null)
            {
                string FileName = Path.GetFileNameWithoutExtension(cm.ImgExample.FileName);
                string Extension = Path.GetExtension(cm.ImgExample.FileName);
                FileName +=DateTime.Now.ToString("yymmssfff") + Extension;
                cm.QuizImg = "~/AppFile/Img/" + FileName;
                cm.ImgExample.SaveAs(Path.Combine(Server.MapPath("~/AppFile/Img/"), FileName));
            }
            using(DBModel db= new DBModel())
            {
                db.CMQuiz.Add(cm);
                db.SaveChanges();
            }
             return RedirectToAction("AddNew");
        }
    }
}