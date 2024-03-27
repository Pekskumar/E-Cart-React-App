import React from "react";
import { Outlet } from "react-router-dom";
import Facebookicon from "../../Images/Facebookicon";
import GitIcon from "../../Images/GitIcon";
import LinkedInlogo from "../../Images/LinkedInlogo";
import YoutubeIcon from "../../Images/YoutubeIcon";
import Header from "./Header";
// import SidebarLeft from "./SidebarLeft";

function Layout() {
  return (
    <>
      <div id="layout-wrapper">
        <Header />
        <div className="d-flex mb-5">
          <main className="main-content w-100">
            <Outlet />
          </main>
        </div>
        <footer class="new_footer_area bg_color mt-5">
          <div class="new_footer_top">
            <div class="px-3">
              <div class="row">
                <div class="col-lg-3 col-md-6">
                  <div
                    class="f_widget company_widget wow fadeInLeft"
                    data-wow-delay="0.2s"
                  >
                    <h3 class="f-title f_600 t_color f_size_18">
                      Get in Touch
                    </h3>
                    <p>
                      Don’t miss any updates of our new products and brands.!
                    </p>
                    <form
                      action="#"
                      class="f_subscribe_two mailchimp"
                      method="post"
                      novalidate="true"
                      _lpchecked="1"
                    >
                      <input
                        type="text"
                        name="EMAIL"
                        class="form-control memail"
                        placeholder="Email"
                      />
                      <button class="btn btn_get btn_get_two" type="submit">
                        Subscribe
                      </button>
                    </form>
                  </div>
                </div>
                <div class="col-lg-3 col-md-6">
                  <div
                    class="f_widget about-widget pl_70 wow fadeInLeft"
                    data-wow-delay="0.4s"
                  >
                    <h3 class="f-title f_600 t_color f_size_18">Download</h3>
                    <ul class="list-unstyled f_list">
                      <li>
                        <a href="#">Company</a>
                      </li>
                      <li>
                        <a href="#">Android App</a>
                      </li>
                      <li>
                        <a href="#">ios App</a>
                      </li>
                      <li>
                        <a href="#">Desktop</a>
                      </li>
                      <li>
                        <a href="#">Projects</a>
                      </li>
                      <li>
                        <a href="#">My tasks</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col-lg-3 col-md-6">
                  <div
                    class="f_widget about-widget pl_70 wow fadeInLeft"
                    data-wow-delay="0.6s"
                  >
                    <h3 class="f-title f_600 t_color f_size_18">Help</h3>
                    <ul class="list-unstyled f_list">
                      <li>
                        <a href="#">FAQ</a>
                      </li>
                      <li>
                        <a href="#">Term &amp; conditions</a>
                      </li>
                      <li>
                        <a href="#">Reporting</a>
                      </li>
                      <li>
                        <a href="#">Documentation</a>
                      </li>
                      <li>
                        <a href="#">Support Policy</a>
                      </li>
                      <li>
                        <a href="#">Privacy</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col-lg-3 col-md-6">
                  <div
                    class="f_widget social-widget pl_70 wow fadeInLeft"
                    data-wow-delay="0.8s"
                  >
                    <h3 class="f-title f_600 t_color f_size_18">
                      Team Solutions
                    </h3>
                    <div class="f_social_icon">
                      <Facebookicon />
                      <GitIcon />
                      <LinkedInlogo className="mx-2" />
                      <YoutubeIcon />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="footer_bg">
              <div class="footer_bg_one"></div>
              <div class="footer_bg_two"></div>
            </div>
          </div>
          <div class="footer_bottom">
            <div class="container">
              <div class="row align-items-center">
                <div class="col-lg-6 col-sm-7">
                  <p class="mb-0 f_400">
                    © Mr. Pek's 2024 All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Layout;
