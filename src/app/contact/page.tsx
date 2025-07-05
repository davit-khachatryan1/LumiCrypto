'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Mail, Phone, MapPin, Clock, MessageCircle, HelpCircle } from 'lucide-react';

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help via email',
      contact: 'support@lumicrypto.com',
      response: 'Within 24 hours'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our team',
      contact: 'Available 24/7',
      response: 'Instant response'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Enterprise customers',
      contact: '+1 (555) 123-4567',
      response: 'Business hours'
    },
    {
      icon: HelpCircle,
      title: 'Help Center',
      description: 'Self-service resources',
      contact: 'Browse FAQs',
      response: 'Available 24/7'
    }
  ];

  const offices = [
    {
      city: 'San Francisco',
      address: '123 Market Street, Suite 456',
      phone: '+1 (555) 123-4567',
      hours: 'Mon-Fri: 9AM-6PM PST'
    },
    {
      city: 'New York',
      address: '456 Broadway, Floor 12',
      phone: '+1 (555) 987-6543',
      hours: 'Mon-Fri: 9AM-6PM EST'
    },
    {
      city: 'London',
      address: '789 Oxford Street, Suite 101',
      phone: '+44 20 7123 4567',
      hours: 'Mon-Fri: 9AM-6PM GMT'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground">
            We're here to help you succeed with LumiCrypto
          </p>
        </motion.div>

        {/* Contact Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {contactMethods.map((method, index) => (
            <Card key={method.title} className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
              <method.icon className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">{method.title}</h3>
              <p className="text-muted-foreground text-sm mb-3">{method.description}</p>
              <p className="font-medium mb-2">{method.contact}</p>
              <p className="text-xs text-muted-foreground">{method.response}</p>
            </Card>
          ))}
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
        >
          <div>
            <h2 className="text-3xl font-bold mb-6">Send us a Message</h2>
            <Card className="p-6">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-input rounded-md bg-background"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-input rounded-md bg-background"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-input rounded-md bg-background"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <select className="w-full px-4 py-2 border border-input rounded-md bg-background">
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Partnership</option>
                    <option>Press & Media</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-2 border border-input rounded-md bg-background"
                    placeholder="Tell us how we can help you..."
                  />
                </div>
                <Button className="w-full">Send Message</Button>
              </form>
            </Card>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">Our Offices</h2>
            <div className="space-y-6">
              {offices.map((office, index) => (
                <Card key={office.city} className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{office.city}</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 mt-1" />
                      <span>{office.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>{office.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{office.hours}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "How do I get started with LumiCrypto?",
                answer: "Simply sign up for a free account and start exploring our AI-powered crypto analysis tools. No credit card required."
              },
              {
                question: "What makes LumiCrypto different?",
                answer: "We combine cutting-edge AI with comprehensive crypto data to provide insights that were previously only available to institutional investors."
              },
              {
                question: "Is my data secure?",
                answer: "Yes, we use enterprise-grade security measures including encryption, secure APIs, and privacy-by-design principles."
              },
              {
                question: "Do you offer custom solutions?",
                answer: "Yes, we provide white-label solutions and custom integrations for enterprises and institutional clients."
              }
            ].map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Emergency Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Card className="p-8 bg-gradient-to-r from-primary/10 to-violet-500/10">
            <h2 className="text-2xl font-bold mb-4">Need Immediate Help?</h2>
            <p className="text-muted-foreground mb-6">
              For urgent technical issues or security concerns, reach out to our emergency support line.
            </p>
            <div className="flex justify-center space-x-4">
              <Button>Emergency Support</Button>
              <Button variant="outline">View Status Page</Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 