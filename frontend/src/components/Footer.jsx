import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="shell border-t">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:px-8 py-10 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-semibold">IT Solutions</h3>
          <p className="mt-2 text-sm text-muted">
            Software, UX/UI, Digital Marketing, and AI Automation.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2 text-sm font-semibold">
            <Link to="/services" className="hover:underline">Services</Link>
            <Link to="/portfolio" className="hover:underline">Portfolio</Link>
            <Link to="/about" className="hover:underline">About</Link>
            <Link to="/faq" className="hover:underline">FAQ</Link>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            {/* <Link to="/blog" className="hover:underline">Blog</Link> */}
            <Link to="/careers" className="hover:underline">Careers</Link>
            <Link to="/contact" className="hover:underline">Contact</Link>
          </div>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); alert("Subscribed!"); }}
          className="space-y-3"
        >
          <label className="block text-sm font-medium">Newsletter</label>
          <div className="flex gap-2">
            <input
              type="email"
              required
              placeholder="email@company.com"
              className="input w-full text-sm"
            />
            <button className="btn btn-primary">Join</button>
          </div>
        </form>
      </div>
      <div className="divider border-t py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} GenHelps. All rights reserved.
      </div>
    </footer>
  );
}
