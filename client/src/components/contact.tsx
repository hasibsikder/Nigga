import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { ContactFormData } from '@/lib/types';

export function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest('POST', '/api/contacts', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you soon.",
      });
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Store",
      content: "123 Design Street\nCreative District, CD 12345\nUnited States"
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+1 (555) 123-4567\nMon-Fri 9am-6pm EST"
    },
    {
      icon: Mail,
      title: "Email Us",
      content: "info@hasibshop.com\nsupport@hasibshop.com"
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", color: "text-blue-600" },
    { icon: Twitter, href: "#", color: "text-blue-400" },
    { icon: Instagram, href: "#", color: "text-pink-600" },
    { icon: Linkedin, href: "#", color: "text-blue-700" },
  ];

  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about our products or need assistance with your order? We're here to help!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="glass-strong rounded-3xl p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <Input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="glass-card border-0 focus:ring-2 focus:ring-indigo-500"
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <Input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="glass-card border-0 focus:ring-2 focus:ring-indigo-500"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="glass-card border-0 focus:ring-2 focus:ring-indigo-500"
                  placeholder="john@example.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="glass-card border-0 focus:ring-2 focus:ring-indigo-500"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <Select value={formData.subject} onValueChange={(value) => handleInputChange('subject', value)} required>
                  <SelectTrigger className="glass-card border-0 focus:ring-2 focus:ring-indigo-500">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="order">Order Question</SelectItem>
                    <SelectItem value="support">Customer Support</SelectItem>
                    <SelectItem value="return">Return/Exchange</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="glass-card border-0 focus:ring-2 focus:ring-indigo-500"
                  placeholder="Tell us how we can help you..."
                  rows={4}
                  required
                />
              </div>
              
              <Button
                type="submit"
                disabled={contactMutation.isPending}
                className="glass-button text-white px-8 py-4 rounded-full font-semibold text-lg w-full border-0"
              >
                {contactMutation.isPending ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="glass-card rounded-2xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="glass w-12 h-12 rounded-xl flex items-center justify-center">
                    <info.icon className="text-indigo-600 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{info.title}</h3>
                    <p className="text-gray-600 whitespace-pre-line">{info.content}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="glass w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white hover:bg-opacity-30 transition-all"
                  >
                    <social.icon className={`w-5 h-5 ${social.color}`} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
