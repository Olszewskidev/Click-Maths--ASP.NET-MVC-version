using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ClickMathsMVC.Startup))]
namespace ClickMathsMVC
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
        }
    }
}
