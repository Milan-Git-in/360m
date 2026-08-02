"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Save, Plus, Trash2, Check, X, Edit3, Image as ImageIcon } from "lucide-react";
import { defaultPasses as initialPasses, type Pass, type PassTier, formatPrice, getStartingPrice } from "../data/passes";

export default function Portal360x() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  
  // Data state
  const [passes, setPasses] = useState<Pass[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Editor state
  const [editingPassId, setEditingPassId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/passes")
      .then(res => res.json())
      .then(data => {
        setPasses(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Failed to load", err);
        setPasses(initialPasses);
        setIsLoading(false);
      });
  }, []);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "mnbvcxzlkjhgfdsapoiuytrewq") {
      setIsAuthenticated(true);
    } else {
      alert("Invalid password");
    }
  };

  const publishData = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/passes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, passes })
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } else {
        alert("Failed to save. Check password or try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving data.");
    } finally {
      setIsSaving(false);
    }
  };

  const addPass = () => {
    const newPass: Pass = {
      id: `new-pass-${Date.now()}`,
      title: "New Event Pass",
      subtitle: "Short description",
      description: "Full description goes here",
      img: "/images/hero-bg.jpg",
      category: "single-night",
      isFeatured: false,
      tiers: [
        {
          id: `tier-${Date.now()}`,
          name: "Base Tier",
          price: 999,
          includes: ["General Access"],
          isSoldOut: false,
        }
      ]
    };
    setPasses([newPass, ...passes]);
    setEditingPassId(newPass.id);
  };

  const updatePass = (id: string, updates: Partial<Pass>) => {
    setPasses(passes.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deletePass = (id: string) => {
    if (confirm("Are you sure you want to delete this pass entirely?")) {
      setPasses(passes.filter(p => p.id !== id));
      if (editingPassId === id) setEditingPassId(null);
    }
  };

  const addTier = (passId: string) => {
    setPasses(passes.map(p => {
      if (p.id === passId) {
        return {
          ...p,
          tiers: [...p.tiers, {
            id: `tier-${Date.now()}`,
            name: "New Tier",
            price: 1500,
            includes: ["Feature 1"],
            isSoldOut: false
          }]
        };
      }
      return p;
    }));
  };

  const updateTier = (passId: string, tierId: string, updates: Partial<PassTier>) => {
    setPasses(passes.map(p => {
      if (p.id === passId) {
        return {
          ...p,
          tiers: p.tiers.map(t => t.id === tierId ? { ...t, ...updates } : t)
        };
      }
      return p;
    }));
  };

  const deleteTier = (passId: string, tierId: string) => {
    setPasses(passes.map(p => {
      if (p.id === passId) {
        return { ...p, tiers: p.tiers.filter(t => t.id !== tierId) };
      }
      return p;
    }));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center px-6">
        <form onSubmit={handleLogin} className="bg-white/5 p-8 rounded-3xl border border-white/10 w-full max-w-sm">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-secondary-fixed font-bold">360</div>
          </div>
          <h1 className="text-xl font-headline-md text-center text-surface-bright mb-6">Secure Portal</h1>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-secondary-fixed outline-none mb-4"
          />
          <button type="submit" className="w-full metallic-gold-btn py-3 rounded-xl font-bold tracking-wider">
            AUTHORIZE
          </button>
        </form>
      </div>
    );
  }

  const editingPass = passes.find(p => p.id === editingPassId);

  return (
    <div className="min-h-screen bg-primary text-surface overflow-x-hidden pb-32">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-primary/90 backdrop-blur-xl border-b border-white/10 p-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="font-headline-md text-xl text-surface-bright leading-none mb-1">Pass Manager</h1>
            <p className="text-[10px] text-surface-variant/60 tracking-widest uppercase">Live Upstash Connection</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={addPass}
            className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/15 rounded-full text-sm font-medium transition-colors"
          >
            <Plus size={16} /> New Pass
          </button>
          <button
            onClick={publishData}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 metallic-gold-btn rounded-full text-sm font-bold tracking-wide transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(233,195,73,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : saved ? <Check size={16} /> : <Save size={16} />}
            {isSaving ? "SYNCING..." : saved ? "SYNCED" : "PUBLISH ALL"}
          </button>
        </div>
      </div>

      {/* Main Grid View */}
      <div className="max-w-7xl mx-auto mt-10 px-6">
        {isLoading ? (
          <div className="flex justify-center items-center py-24">
            <div className="w-10 h-10 border-2 border-secondary-fixed/30 border-t-secondary-fixed rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {passes.map((pass) => (
              <div 
                key={pass.id} 
                onClick={() => setEditingPassId(pass.id)}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
                  pass.isFeatured ? "bg-white/10 border-2 border-secondary-fixed shadow-[0_0_30px_rgba(233,195,73,0.15)]" : "bg-white/5 border border-white/10 hover:border-secondary-fixed/50"
                }`}
              >
                {/* Image preview */}
                <div className="relative h-32 bg-black/50 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity" style={{ backgroundImage: `url(${pass.img})` }} />
                  <ImageIcon className="text-white/20 relative z-10" size={32} />
                  
                  {pass.isFeatured && (
                    <div className="absolute top-3 right-3 px-2 py-0.5 bg-secondary-fixed text-on-secondary-fixed text-[9px] font-bold tracking-widest rounded-full z-10">
                      FEATURED
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <h3 className="font-headline-md text-lg text-surface-bright mb-1 truncate">{pass.title}</h3>
                  <p className="text-xs text-surface-variant/60 truncate mb-4">{pass.subtitle}</p>
                  
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-[9px] text-surface-variant/40 tracking-widest uppercase block mb-1">Starting From</span>
                      <span className="font-bold text-secondary-fixed">{formatPrice(getStartingPrice(pass))}</span>
                    </div>
                    <div className="text-[10px] text-surface-variant/60 bg-white/5 px-2 py-1 rounded">
                      {pass.tiers.length} Tiers
                    </div>
                  </div>
                </div>

                {/* Edit Overlay on Hover */}
                <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                  <Edit3 size={24} className="text-secondary-fixed mb-2" />
                  <span className="font-label-md tracking-widest text-sm text-white">CLICK TO EDIT</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Slide-over Editor Modal */}
      <AnimatePresence>
        {editingPassId && editingPass && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
              onClick={() => setEditingPassId(null)}
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-2xl bg-primary shadow-2xl shadow-black border-l border-white/10 z-[100] overflow-y-auto flex flex-col"
            >
              <div className="sticky top-0 bg-primary/90 backdrop-blur-xl border-b border-white/10 p-6 flex justify-between items-center z-10">
                <div>
                  <h2 className="font-headline-md text-2xl text-secondary-fixed italic">Edit Event Pass</h2>
                  <p className="text-xs text-surface-variant/60 tracking-wider">ID: {editingPass.id}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => deletePass(editingPass.id)}
                    className="p-2.5 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                    title="Delete Pass"
                  >
                    <Trash2 size={18} />
                  </button>
                  <button 
                    onClick={() => setEditingPassId(null)}
                    className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="p-8 space-y-10 flex-1">
                {/* General Details */}
                <section>
                  <h3 className="font-label-md tracking-widest text-surface-variant/40 text-xs mb-4">GENERAL DETAILS</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] text-surface-variant/60 block mb-1">EVENT TITLE</label>
                        <input
                          value={editingPass.title}
                          onChange={(e) => updatePass(editingPass.id, { title: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-secondary-fixed outline-none text-white font-medium"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-surface-variant/60 block mb-1">CATEGORY</label>
                        <select
                          value={editingPass.category}
                          onChange={(e) => updatePass(editingPass.id, { category: e.target.value as any })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-secondary-fixed outline-none text-white appearance-none"
                        >
                          <option value="single-night">Single Night</option>
                          <option value="season">Season Pass</option>
                          <option value="vvip">VVIP & Tables</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-[10px] text-surface-variant/60 block mb-1">SUBTITLE</label>
                      <input
                        value={editingPass.subtitle}
                        onChange={(e) => updatePass(editingPass.id, { subtitle: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-secondary-fixed outline-none text-white text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="text-[10px] text-surface-variant/60 block mb-1">FULL DESCRIPTION</label>
                      <textarea
                        value={editingPass.description}
                        onChange={(e) => updatePass(editingPass.id, { description: e.target.value })}
                        rows={4}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-secondary-fixed outline-none text-white text-sm resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] text-surface-variant/60 block mb-1">IMAGE URL</label>
                        <input
                          value={editingPass.img}
                          onChange={(e) => updatePass(editingPass.id, { img: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-secondary-fixed outline-none text-white text-sm"
                        />
                      </div>
                      <div className="flex items-center gap-3 bg-white/5 rounded-xl border border-white/10 px-4">
                        <input
                          type="checkbox"
                          id={`featured-${editingPass.id}`}
                          checked={editingPass.isFeatured}
                          onChange={(e) => updatePass(editingPass.id, { isFeatured: e.target.checked })}
                          className="w-4 h-4 rounded border-white/20 text-secondary-fixed focus:ring-secondary-fixed/50"
                        />
                        <label htmlFor={`featured-${editingPass.id}`} className="text-sm text-surface-variant">Featured Pass</label>
                      </div>
                    </div>
                  </div>
                </section>

                <hr className="border-white/5" />

                {/* Tiers / Options */}
                <section>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-label-md tracking-widest text-surface-variant/40 text-xs">TICKET TIERS</h3>
                    <button
                      onClick={() => addTier(editingPass.id)}
                      className="text-[10px] font-bold tracking-widest bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full flex items-center gap-1 transition-colors"
                    >
                      <Plus size={12} /> ADD TIER
                    </button>
                  </div>

                  <div className="space-y-4">
                    {editingPass.tiers.map((tier) => (
                      <div key={tier.id} className={`p-5 rounded-2xl border relative ${tier.isSoldOut ? 'bg-red-500/5 border-red-500/20' : 'bg-black/20 border-white/10'}`}>
                        <button 
                          onClick={() => deleteTier(editingPass.id, tier.id)} 
                          className="absolute top-4 right-4 text-surface-variant/30 hover:text-red-400"
                        >
                          <X size={16} />
                        </button>

                        <div className="space-y-4 pr-6">
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="col-span-2 md:col-span-1">
                              <label className="text-[10px] text-surface-variant/60 block mb-1">TIER NAME</label>
                              <input
                                value={tier.name}
                                onChange={(e) => updateTier(editingPass.id, tier.id, { name: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-secondary-fixed outline-none text-white"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] text-surface-variant/60 block mb-1">PRICE (₹)</label>
                              <input
                                type="number"
                                value={tier.price}
                                onChange={(e) => updateTier(editingPass.id, tier.id, { price: Number(e.target.value) })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-secondary-fixed outline-none text-secondary-fixed font-bold"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] text-surface-variant/60 block mb-1">TAG</label>
                              <input
                                placeholder="e.g. BEST SELLER"
                                value={tier.tag || ""}
                                onChange={(e) => updateTier(editingPass.id, tier.id, { tag: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-secondary-fixed outline-none text-white"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-[10px] text-surface-variant/60 block mb-1">FEATURES (Comma separated)</label>
                            <input
                              value={tier.includes.join(", ")}
                              onChange={(e) => {
                                const arr = e.target.value.split(",").map(s => s.trim()).filter(Boolean);
                                updateTier(editingPass.id, tier.id, { includes: arr });
                              }}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-secondary-fixed outline-none text-white"
                            />
                          </div>

                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id={`soldout-${tier.id}`}
                              checked={tier.isSoldOut}
                              onChange={(e) => updateTier(editingPass.id, tier.id, { isSoldOut: e.target.checked })}
                              className="w-4 h-4 rounded border-white/20 text-red-500 focus:ring-red-500/50"
                            />
                            <label htmlFor={`soldout-${tier.id}`} className="text-xs font-bold tracking-wide text-red-400">Mark as Sold Out</label>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {editingPass.tiers.length === 0 && (
                      <div className="text-center py-6 text-surface-variant/40 border border-dashed border-white/10 rounded-2xl text-sm">
                        No tiers added yet. A pass must have at least one tier.
                      </div>
                    )}
                  </div>
                </section>
              </div>

              {/* Sticky Footer */}
              <div className="sticky bottom-0 p-6 bg-primary/90 backdrop-blur-xl border-t border-white/10 flex justify-between items-center">
                <span className="text-xs text-surface-variant/50">Changes apply locally until you click Publish All</span>
                <button
                  onClick={() => setEditingPassId(null)}
                  className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-full font-label-md text-sm transition-colors"
                >
                  DONE EDITING
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
