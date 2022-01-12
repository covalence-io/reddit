import styles from './navbar.module.css';

export default function Navbar() {
    return (
        <nav className={`${styles.navbar} bg-white`}>
            <div className="max-w-7xl mx-auto sm:px-4 lg:px-8 lg:divide-y lg:divide-gray-200">
                <div className="relative h-16 flex justify-between">
                    {/* Application Logo */}
                    <div className="relative z-10 px-2 flex lg:px-0">
                        <div className="flex-shrink-0 flex items-center">
                            <img className="block h-8 w-auto" src="/logos/subreddit.png" alt="SubReddit" />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}