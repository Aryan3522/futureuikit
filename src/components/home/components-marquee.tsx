"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from "framer-motion";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Star, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalBody, ModalFooter, ModalClose } from "@/components/ui/modal";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

const initialTestimonialsData = [
  {
    id: 1,
    quote: "Future UI completely transformed our development workflow. We built our new SaaS dashboard in half the time.",
    author: "Elena Rodriguez",
    role: "Lead Engineer @ TechNova",
    avatar: "ER",
    rating: 5,
  },
  {
    id: 2,
    quote: "The attention to detail in the micro-animations is unmatched. Our users immediately noticed the premium feel of our app.",
    author: "Marcus Chen",
    role: "Product Designer @ Nexus",
    avatar: "MC",
    rating: 5,
  },
  {
    id: 3,
    quote: "Finally, a component library that treats Framer Motion as a first-class citizen rather than an afterthought. Incredible work.",
    author: "Sarah Jenkins",
    role: "Frontend Architect",
    avatar: "SJ",
    rating: 5,
  },
  {
    id: 4,
    quote: "The CLI distribution model is brilliant. I get exactly the code I need without the bloat of traditional npm packages.",
    author: "David Kim",
    role: "Indie Developer",
    avatar: "DK",
    rating: 5,
  },
  {
    id: 5,
    quote: "I've tried many UI libraries, but Future UI stands out with its modern aesthetic and seamless integration.",
    author: "Emily Watson",
    role: "Fullstack Developer",
    avatar: "EW",
    rating: 5,
  },
  {
    id: 6,
    quote: "The components are highly customizable and accessible out of the box. It saved us countless hours of tweaking.",
    author: "James Peterson",
    role: "UI/UX Engineer",
    avatar: "JP",
    rating: 5,
  }
];

const MarqueeRow = ({ items, reverse = false, speed = 40 }: { items: any[], reverse?: boolean, speed?: number }) => {
  const baseX = useMotionValue(0);

  // Calculate perfect loop width based on unique items (320px width + 24px gap = 344px)
  const uniqueCount = items.length || 1;
  const loopWidth = uniqueCount * 344;

  // Duplicate items enough times to fill a large screen (e.g., 4000px wide) without gaps
  const multiplyFactor = Math.max(4, Math.ceil(4000 / loopWidth));
  const duplicatedItems = Array(multiplyFactor).fill(items).flat();

  useAnimationFrame((time, delta) => {
    // If there are no items, don't animate
    if (uniqueCount === 0) return;
    
    let moveBy = reverse ? speed * (delta / 1000) : -speed * (delta / 1000);
    let x = baseX.get() + moveBy;

    if (x <= -loopWidth) {
      x += loopWidth;
    } else if (x >= 0 && reverse) {
      x -= loopWidth;
    }

    baseX.set(x);
  });

  return (
    <div className="flex gap-6 relative" style={{ width: "fit-content" }}>
      <motion.div className="flex gap-6" style={{ x: baseX }}>
        {duplicatedItems.map((item, index) => {
          return (
            <div key={`${item.id}-${index}`}>
              <GlassPanel
                variant="mantle"
                className="w-[320px] p-6 h-full flex flex-col justify-between shrink-0"
                glow="subtle"
              >
                <div className="flex flex-col h-full">
                  <div className="flex gap-1 mb-4">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-secondary fill-secondary" />
                    ))}
                  </div>
                  <p className="font-display text-lg font-light leading-snug text-foreground flex-1 mb-6">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary p-[1px]">
                      <div className="w-full h-full rounded-full bg-background flex items-center justify-center font-display text-sm font-bold">
                        {item.avatar}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-display font-medium text-sm">{item.author}</h4>
                      <p className="text-muted-foreground text-[10px] font-mono-label mt-0.5">{item.role}</p>
                    </div>
                  </div>
                </div>
              </GlassPanel>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export function ComponentsMarquee() {
  const [testimonials, setTestimonials] = useState(initialTestimonialsData);
  const [formData, setFormData] = useState({ name: "", role: "", quote: "", rating: 5 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchTestimonials() {
      if (!supabase) return;
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false });
        
      if (!error && data && data.length > 0) {
        const mapped = data.map(d => ({
          id: d.id,
          quote: d.quote,
          author: d.author,
          role: d.role,
          avatar: d.avatar || d.author.charAt(0).toUpperCase(),
          rating: d.rating || 5,
        }));
        
        // Ensure there are enough items to loop seamlessly by padding with initials
        setTestimonials([...mapped, ...initialTestimonialsData]);
      }
    }
    fetchTestimonials();
  }, []);

  const handleSubmit = async () => {
    if (!formData.name || !formData.quote) {
      toast({ title: "Error", description: "Name and Quote are required." });
      return;
    }

    if (!supabase) {
      toast({ title: "Error", description: "Database is not connected. Please check your .env file." });
      return;
    }

    setIsSubmitting(true);
    
    // Create the new testimonial object
    const newTestimonial = {
      author: formData.name,
      role: formData.role,
      quote: formData.quote,
      rating: formData.rating,
      avatar: formData.name.charAt(0).toUpperCase(),
      approved: true // Changed to true so it shows up instantly for testing
    };

    const { data, error } = await supabase.from('testimonials').insert([newTestimonial]).select();

    setIsSubmitting(false);

    if (error) {
      toast({ title: "Error", description: "Failed to submit testimonial." });
    } else {
      toast({ title: "Success", description: "Your testimonial has been added!" });
      
      // Update the UI instantly without needing a page refresh
      const addedTestimonial = data && data.length > 0 ? data[0] : { ...newTestimonial, id: Date.now() };
      setTestimonials(prev => [addedTestimonial, ...prev]);
      
      setFormData({ name: "", role: "", quote: "", rating: 5 });
    }
  };

  const half = Math.ceil(testimonials.length / 2);
  const row1Items = testimonials.slice(0, half);
  const row2Items = testimonials.slice(half);

  return (
    <section className="py-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-secondary/5 blur-[120px] rounded-full w-[500px] h-[500px] -left-64 top-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono-label text-xs text-muted-foreground uppercase tracking-widest flex items-center gap-2">
              <span className="w-8 h-px bg-secondary/50" /> Testimonials
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-light mt-2">COMMUNITY VOICES</h2>
          </div>
          <Modal variant="glass" size="md" position="center">
            <ModalTrigger asChild>
              <Button variant="outline" className="shrink-0 gap-2 rounded-full h-10 px-6 font-mono-label text-xs uppercase tracking-wider bg-background/50 backdrop-blur-md border-border/50 hover:bg-muted/30">
                <Plus className="w-4 h-4" />
                Add Testimonial
              </Button>
            </ModalTrigger>
            <ModalContent>
              <ModalHeader>
                <ModalTitle>Add a Testimonial</ModalTitle>
                <ModalDescription>Share your experience with Future UI.</ModalDescription>
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4 mt-2">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-foreground">Name *</label>
                    <input 
                      type="text"
                      className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-foreground">Role</label>
                    <input 
                      type="text"
                      className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary"
                      placeholder="Lead Engineer @ TechNova"
                      value={formData.role}
                      onChange={e => setFormData({ ...formData, role: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-foreground">Quote *</label>
                    <textarea 
                      className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm min-h-[100px] resize-none focus:outline-none focus:border-primary"
                      placeholder="Future UI is amazing..."
                      value={formData.quote}
                      onChange={e => setFormData({ ...formData, quote: e.target.value })}
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <ModalClose asChild>
                  <Button variant="ghost">Cancel</Button>
                </ModalClose>
                <ModalClose asChild>
                  <Button variant="solid" onClick={handleSubmit} disabled={isSubmitting}>Submit</Button>
                </ModalClose>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="flex flex-col gap-6">
            {/* Row 1 */}
            <div className="w-full relative flex">
              <MarqueeRow items={row1Items} speed={60} />
            </div>

            {/* Row 2 */}
            <div className="w-full relative flex">
              <MarqueeRow items={row2Items} reverse speed={50} />
            </div>
          </div>

          {/* Premium Fade Masks - Aligned with container boundaries */}
          <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
