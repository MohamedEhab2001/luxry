import useSWR from 'swr';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AccountPage() {
  const { data: orders } = useSWR('/api/orders', fetcher);
  const { data: addresses } = useSWR('/api/addresses', fetcher);
  const { data: wishlist } = useSWR('/api/wishlist', fetcher);

  return (
    <div className="container space-y-8 py-10">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-gold-400">Account</p>
          <h1 className="text-3xl font-semibold">Orders, addresses, wishlist</h1>
        </div>
        <Link href="/auth/login" className="btn-secondary">
          Login/Register
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <section className="card-surface p-6 space-y-3">
          <div className="text-lg font-semibold">Orders</div>
          {(orders?.orders || []).length === 0 && <p className="text-sm text-zinc-500">No orders yet.</p>}
          <div className="space-y-2 text-sm text-zinc-400">
            {orders?.orders?.map((order: any) => (
              <div key={order._id || order.id} className="rounded-lg border border-zinc-800 p-3">
                <div className="font-medium">Total: ${order.total}</div>
                <div className="text-xs text-zinc-500">Status: {order.statusHistory?.[0]?.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="card-surface p-6 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">Addresses</div>
            <Button variant="ghost" className="text-xs">Add</Button>
          </div>
          <div className="space-y-2 text-sm text-zinc-400">
            {(addresses?.addresses || []).map((address: any) => (
              <div key={address._id || address.label} className="rounded-lg border border-zinc-800 p-3">
                <div className="font-medium">{address.label}</div>
                <div className="text-xs text-zinc-500">{address.city}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="card-surface p-6 space-y-3">
          <div className="text-lg font-semibold">Wishlist</div>
          <div className="space-y-2 text-sm text-zinc-400">
            {(wishlist?.wishlist || []).map((item: any) => (
              <div key={item} className="rounded-lg border border-zinc-800 p-3">
                {item}
              </div>
            ))}
            {(wishlist?.wishlist || []).length === 0 && <p className="text-sm text-zinc-500">No saved items yet.</p>}
          </div>
        </section>
      </div>
    </div>
  );
}
