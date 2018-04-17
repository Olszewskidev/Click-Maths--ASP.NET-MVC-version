using ClickMathsMVC.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;
using X.PagedList;

namespace ClickMathsMVC.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index(string search, int? page)
        {
            int QuizsonPage = 10;
            List<CMQuiz> ToShow = new List<CMQuiz>();
            if (search == "NoMetter" || search==null)
            {
                ToShow = Get10Quizs().ToList();
            }
            else 
            {
                switch (search)
                {
                    case "Easy":
                        ToShow= Get10Quizs().Where(q => q.Difficult== 1).ToList();
                        break;
                    case "Medium":
                        ToShow = Get10Quizs().Where(q => q.Difficult == 2).ToList();
                        break;
                    case "Hard":
                        ToShow = Get10Quizs().Where(q => q.Difficult == 3).ToList();
                        break;
                }
            }
           return View(ToShow.ToPagedList(page ?? 1, QuizsonPage));
        }
        public ActionResult Start()
        {
            return View();
        }
        public ActionResult Android()
        {
            return View();
        }
        private IEnumerable<CMQuiz> Get10Quizs()
        {
            using (DBModel db = new DBModel())
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
            { //CHECKING THE SIZE OF UPLOADE IMG, BECAUSE THE BEST SIZE IS 640x250//
                //WebImage img = new WebImage(cm.ImgExample.InputStream);
                //if (img.Height != 250 && img.Width != 640)
                //{
                //    img.Resize(640, 250);
                //    //  img.Save()
                //    string FileName1 = Path.GetFileNameWithoutExtension(img.FileName);
                //    //     string Extension1 = Path.GetExtension(img.FileName);
                //    string Extension1 = img.ImageFormat;
                //    FileName1 = FileName1 + DateTime.Now.ToString("yymmssfff") + Extension1;
                //    cm.QuizImg = "~/AppFile/Img/" + FileName1;
                //    cm.ImgExample.SaveAs(Path.Combine(Server.MapPath("~/AppFile/Img/"), FileName1));

                //}
                //else
                //{
                    string FileName = Path.GetFileNameWithoutExtension(cm.ImgExample.FileName);
                    string Extension = Path.GetExtension(cm.ImgExample.FileName);
                    FileName = FileName + DateTime.Now.ToString("yymmssfff") + Extension;
                    cm.QuizImg = "~/AppFile/Img/" + FileName;
                    cm.ImgExample.SaveAs(Path.Combine(Server.MapPath("~/AppFile/Img/"), FileName));
             //   }
            
           
               
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