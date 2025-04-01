﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using SnowMemoria.Models;

namespace SnowMemoria.Pages
{
    public class IndexModel : PageModel
    {
        /// <summary>
        /// 网站信息
        /// </summary>
        public WebSiteModel WebSite { get; set; }

        /// <summary>
        /// 页面标题
        /// </summary>
        public string PageTitle { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public void OnGet()
        {
        }
    }
}
