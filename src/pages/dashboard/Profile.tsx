import React from 'react';
import { User, Mail, Phone, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/UserContext';

const Profile: React.FC = () => {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  const profileItems = [
    { icon: User, label: 'Full Name', value: user.name },
    { icon: Mail, label: 'Email', value: user.email },
    { icon: Phone, label: 'Phone', value: user.phone },
    { icon: Calendar, label: 'Member Since', value: new Date(user.joinDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }) },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your account information</p>
      </div>

      <div className="bg-card rounded-xl shadow-card overflow-hidden">
        {/* Profile Header */}
        <div className="hero-gradient p-8 text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-primary-foreground/20 flex items-center justify-center mb-4">
            <User className="w-12 h-12 text-primary-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-primary-foreground">{user.name}</h2>
          <p className="text-primary-foreground/80">{user.email}</p>
        </div>

        {/* Profile Details */}
        <div className="p-6 space-y-6">
          {profileItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="font-medium text-foreground">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Button - UI Only */}
        <div className="p-6 pt-0">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              // TODO: Implement edit profile functionality
              alert('Edit profile functionality will be available with backend integration.');
            }}
          >
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Info Note */}
      <div className="bg-info/10 border border-info/20 rounded-lg p-4 text-sm text-info">
        <p className="font-medium">Demo Mode</p>
        <p className="text-muted-foreground mt-1">
          Profile editing will be enabled when backend integration is complete.
        </p>
      </div>
    </div>
  );
};

export default Profile;
