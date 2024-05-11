import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
        <div class="footer-links">
        <h4>INFO</h4>
        <p><a href="#">About</a></p>
        <p><a href="#">Privacy Policy</a></p>
        <p><a href="#">Terms & Conditions</a></p>
        <p><a href="#">Return/Exchange Policy</a></p>
        <p><a href="#">FAQ</a></p>
    </div>
    <div class="footer-links">
        <h4 >CONTACT  US</h4>
        <p><a href="#">Facebook</a></p>
        <p><a href="#">Twitter</a></p>
        <p><a href="#">Instagram</a></p>
        <p><a href="#">Youtube</a></p>
    </div>
    <div class="footer-links">
        <p><a href="#">Jaykay Marketing Services Pvt Ltd.</a></p>
        <p><a href="#">No:148,Vauxhall Street,Colombo 2,Sri</a></p>
        <p><a href="#">Lanka.</a></p>
        <p><a href="#">(Daily operating hours 8.00a.m to 8.00p.m)</a></p>
        <p><a href="#">Hotline:(415)261-0675</a></p>
        <p><a href="#">Fax:(415)-366-8520</a></p>
    </div>
    <div class="footer-links">
        <h4>PAYMENTS</h4>
    </div>

    <style>
                {`
                      footer {
                        background-color: black;
                        position: relative;
                        padding: 20px;
                        display: flex;
                        justify-content: space-between; /* Align items evenly */
                        align-items: flex-start; /* Align items at the start */
                        flex-wrap: wrap; /* Wrap items to the next line if necessary */
                    }
                    .footer-links {
                        color: white;
                        text-align: left;
                        margin-bottom: 20px; /* Add some bottom margin for spacing */
                    }
                    .footer-links a {
                        color: white;
                        text-decoration: none;
                    }
                `}
            </style>

        </footer>
    )
}

export default Footer;