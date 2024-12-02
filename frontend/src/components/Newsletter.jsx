import React from 'react';
import './Newsletter.css'; 

const Newsletter = () => {
    return (
        <div className="newsletter">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row">
                    <div className="newsletter_left flex-1">
                        <div>
                            <h4 className="title-dangky">Đăng ký</h4>
                            <p className="newsletter_text">Đăng ký để nhận thông tin sớm nhất về chương trình giảm giá.</p>
                        </div>
                    </div>

                    <div className="newsletter_right flex-1">
                        <form action="post">
                            <div className="newsletter_form">
                                <input 
                                  id="newsletter_email" 
                                  type="email" 
                                  placeholder="Email của bạn" 
                                  required 
                                  data-error="Valid email is required." 
                                />
                                <button id="newsletter_submit" type="submit" className="newsletter_submit_btn">
                                    Đăng ký
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;
