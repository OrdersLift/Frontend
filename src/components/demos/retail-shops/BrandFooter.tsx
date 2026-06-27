import { Leaf, MapPin, Phone, Mail, Instagram, Twitter } from 'lucide-react';
import { storeInfo } from './data';

export default function BrandFooter() {
  return (
    <footer className="bg-emerald-950 text-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-emerald-600 text-white">
                <Leaf className="w-5 h-5" />
              </span>
              <span className="font-display text-xl font-semibold">Fernweh</span>
            </div>
            <p className="text-sm text-emerald-300/80 leading-relaxed">
              {storeInfo.tagline}. Carefully grown, thoughtfully shipped.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="#" className="w-9 h-9 rounded-full bg-emerald-900 hover:bg-emerald-800 flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-emerald-900 hover:bg-emerald-800 flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-emerald-300/80">
              <li><a href="/demo/retail-shops/shop?cat=Plants" className="hover:text-white">Plants</a></li>
              <li><a href="/demo/retail-shops/shop?cat=Planters" className="hover:text-white">Planters</a></li>
              <li><a href="/demo/retail-shops/shop?cat=Care" className="hover:text-white">Care &amp; Tools</a></li>
              <li><a href="/demo/retail-shops/shop?cat=Decor" className="hover:text-white">Decor</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Visit</h4>
            <ul className="space-y-3 text-sm text-emerald-300/80">
              <li className="flex gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0" />{storeInfo.address}</li>
              <li className="flex gap-2"><Phone className="w-4 h-4 mt-0.5 shrink-0" />{storeInfo.phone}</li>
              <li className="flex gap-2"><Mail className="w-4 h-4 mt-0.5 shrink-0" />{storeInfo.email}</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Hours</h4>
            <ul className="space-y-2 text-sm text-emerald-300/80">
              {storeInfo.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span>{h.day}</span>
                  <span className="text-emerald-200">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-emerald-900 flex flex-col sm:flex-row gap-2 justify-between text-xs text-emerald-400/70">
          <p>© {new Date().getFullYear()} Fernweh Botanical Goods. A demo by OrdersLift.</p>
          <p>{storeInfo.shipping}</p>
        </div>
      </div>
    </footer>
  );
}
