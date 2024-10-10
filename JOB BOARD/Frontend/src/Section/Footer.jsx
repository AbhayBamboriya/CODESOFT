import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs';

function Footer() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();

    return (
        <footer className="relative bottom-0 py-5 flex flex-col sm:flex-row items-center justify-between text-white bg-gray-800 px-5 sm:px-20">
            <section className="text-lg text-red">
                Copyright {year} | All rights reserved
            </section>
            <section className="flex items-center justify-center gap-5 mt-3 sm:mt-0">
                <a className="hover:txt-yellow-500 transition-colors duration-300" href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                    <BsFacebook className="text-2xl"  aria-hidden="true"/>
                </a>
                <a className="hover:text-yellow-500 transition-colors duration-300" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                    <BsInstagram className="text-2xl" />
                </a>
                <a className="hover:text-yellow-500 transition-colors duration-300" href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                    <BsLinkedin className="text-2xl" />
                </a>
                <a className="hover:text-yellow-500 transition-colors duration-300" href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                    <BsTwitter className="text-2xl" />
                </a>
            </section>
        </footer>
    );
}

export default Footer;
