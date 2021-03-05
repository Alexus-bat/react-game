import React from 'react';
import './Footer.scss';

const Footer: React.FC = () => {
    return (
        <>
            <footer className="footer">
                <div className="container">
                    <div className="row">
                            <a className="footer-logo" href="https://rs.school/js/" rel="noreferrer" target="_blank"></a>
                        © 2021 <a href="https://github.com/Alexus-bat" rel="noreferrer" target="_blank">Created by @Alexus-bat</a>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;
