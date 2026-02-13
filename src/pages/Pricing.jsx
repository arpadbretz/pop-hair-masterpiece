import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '../components/Common';

const pricingData = [
    { name: "Női Hajvágás", price: "22.500", desc: "Személyre szabott stílustanácsadással és mosással" },
    { name: "Mesterfodrász Vágás", price: "28.000", desc: "Bacsik Szilvia vezetésével" },
    { name: "Balayage Ritual", price: "42.000-től", desc: "Kevin Murphy kényeztetéssel és árnyalással" },
    { name: "Teljes Festés", price: "32.000-től", desc: "Környezettudatos KM színekkel" },
    { name: "Hajregenerálás", price: "18.500", desc: "Mélytápláló rituálé sérült hajszerkezetre" },
    { name: "Férfi Vágás", price: "12.500", desc: "Prémium stylinggal" },
];

const Pricing = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="page-transition-wrapper pt-48 pb-32 bg-white"
        >
            <div className="max-w-7xl mx-auto px-8">
                <SectionTitle title="A Befektetés" subtitle="ÁRAINK" align="center" />

                <div className="grid lg:grid-cols-2 gap-x-32 gap-y-16 mt-20">
                    {pricingData.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex justify-between items-end border-b border-black/5 pb-8 group cursor-pointer"
                        >
                            <div className="space-y-2">
                                <h3 className="text-3xl font-serif italic group-hover:text-luxury-gold transition-colors">{item.name}</h3>
                                <p className="text-xs text-gray-400 uppercase tracking-widest">{item.desc}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xl font-serif italic text-black">{item.price} HUF</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-32 p-16 bg-off-white text-center border border-luxury-gold/10">
                    <p className="text-lg font-light text-gray-500 mb-8 italic">Az árak tájékoztató jellegűek, a pontos összeg a haj hosszától és sűrűségétől függően változhat. Személyes konzultáció során pontos árajánlatot adunk.</p>
                    <button className="px-12 py-5 bg-black text-white text-[10px] uppercase font-bold tracking-[0.5em] hover:bg-luxury-gold hover:text-black transition-all">Időpontot foglalok</button>
                </div>
            </div>
        </motion.div>
    );
};

export default Pricing;
