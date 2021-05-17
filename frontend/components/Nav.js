import Link from 'next/link';

export default function Nav() {
    return (
        <nav className="nav">
            <Link href="/products">Products</Link>
            <Link href="/sell">Sell</Link>
            <Link href="/orders">Orders</Link>
            <Link href="/account">Account</Link>
        </nav>
    );
}
