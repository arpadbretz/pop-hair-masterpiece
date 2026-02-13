import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle, PerspectiveReveal } from '../components/Common';
import { Phone, Mail, MapPin, Instagram, Facebook, Clock } from 'lucide-react';

const bookingLink = "https://b998424.alteg.io/company/624179/personal/menu?o=";

const Contact = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="page-transition-wrapper pt-48 pb-32 bg-white"
        >
            <div className="max-w-7xl mx-auto px-8">
                <SectionTitle title="Kapcsolat" subtitle="ELÉRHETŐSÉG" align="center" />

                <div className="grid lg:grid-cols-2 gap-32 items-start mt-20">
                    <div className="space-y-16">
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 text-luxury-gold">
                                    <Phone size={20} />
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-black">Telefonszám</span>
                                </div>
                                <p className="text-3xl font-serif italic">06 30 590 1766</p>
                            </div>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 text-luxury-gold">
                                    <Mail size={20} />
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-black">Email</span>
                                </div>
                                <p className="text-2xl font-serif italic">hello@pophair.hu</p>
                            </div>
                        </div>

                        <div className="space-y-6 pt-12 border-t border-black/5">
                            <div className="flex items-center gap-4 text-luxury-gold">
                                <MapPin size={20} />
                                <span className="text-[10px] uppercase font-bold tracking-widest text-black">Címünk</span>
                            </div>
                            <p className="text-3xl font-serif italic max-w-md">Budapest, Alkotás u. 39 c, 1023</p>
                            <p className="text-gray-400 text-sm font-light">Szalonunk Budán, az Alkotás utcában található, könnyen megközelíthető helyen.</p>
                        </div>

                        <div className="space-y-6 pt-12 border-t border-black/5">
                            <div className="flex items-center gap-4 text-luxury-gold">
                                <Clock size={20} />
                                <span className="text-[10px] uppercase font-bold tracking-widest text-black">Nyitvatartás</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-lg font-serif italic">
                                <div>
                                    <p className="text-gray-400 text-xs uppercase not-italic tracking-widest mb-1">Hétfő - Péntek</p>
                                    <p>08:00 - 20:00</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs uppercase not-italic tracking-widest mb-1">Szombat</p>
                                    <p>09:00 - 15:00</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-8 pt-12">
                            <a href="https://www.instagram.com/pophair_szalon/" target="_blank" rel="noopener noreferrer" className="w-16 h-16 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all transform hover:-rotate-12">
                                <Instagram size={24} />
                            </a>
                            <a href="https://www.facebook.com/pophairszalon" target="_blank" rel="noopener noreferrer" className="w-16 h-16 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all transform hover:-rotate-12">
                                <Facebook size={24} />
                            </a>
                        </div>
                    </div>

                    <div className="space-y-12 bg-off-white p-16 border border-black/5 shadow-2xl relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/10 rounded-bl-full pointer-events-none" />
                        <h2 className="text-4xl font-serif italic mb-8">Foglaljon <span className="text-luxury-gold">időpontot</span></h2>
                        <p className="text-gray-500 font-light mb-12">Online rendszerünkön keresztül egyszerűen kiválaszthatja a számodra megfelelő időpontot és mesterfodrászt.</p>
                        <a
                            href={bookingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-8 bg-black text-white text-[11px] uppercase font-bold tracking-[0.5em] hover:bg-luxury-gold hover:text-black transition-all shadow-xl text-center block"
                        >
                            Ugrás a foglaláshoz
                        </a>
                        <div className="mt-12 p-8 border border-luxury-gold/20 bg-white">
                            <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">Fontos tudnivaló</p>
                            <p className="text-sm font-light leading-relaxed">Amennyiben elrontott haj javítására érkezne, kérjük, foglalás előtt mindenképp vegye fel velünk a kapcsolatot telefonon egy előzetes konzultáció végett!</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Google Maps Section */}
            <section className="mt-48 h-[600px] transition-all duration-1000 overflow-hidden relative group">
                <iframe
                    title="Google Maps"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2695.53177614!2d19.0229986!3d47.4912222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741de7ba1a0c4f7%3A0x7d8383e3e0689b9e!2zQnVkYXBlc3QsIEFsa290w6FzIHUuIDM5LCAxMTIz!5e0!3m2!1sen!2shu!4v1700000000000!5m2!1sen!2shu"
                    className="w-full h-full border-0 transition-all duration-1000"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </section>
        </motion.div>
    );
};

export default Contact;
