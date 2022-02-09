import styles from './footer.module.css';

export default function Footer() {
    return (
        <footer className="bg-white absolute left-0 bottom-0 w-full z-50 dark:bg-black dark:text-white">
            <div className="text-center h-16 px-2 sm:px-6 lg:px-8 flex items-center justify-center">
                <span className="text-xs">Copyright © 2022</span>
            </div>
        </footer>
    );
}
