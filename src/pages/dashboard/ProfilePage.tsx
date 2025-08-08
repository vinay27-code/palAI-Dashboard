
import { useState } from 'react';
import { Card } from '../../components/base/Card';
import { Button } from '../../components/base/Button';
import { Input } from '../../components/base/Input';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  highSchool: string;
  graduationYear: string;
  gpa: string;
  satScore: string;
  actScore: string;
  bio: string;
  interests: string[];
  targetMajors: string[];
  collegePreferences: {
    size: string;
    location: string;
    type: string;
  };
}

const mockProfile: UserProfile = {
  firstName: 'Alex',
  lastName: 'Johnson',
  email: 'demo@collegeai.com',
  phone: '+1 (555) 123-4567',
  dateOfBirth: '2005-08-15',
  highSchool: 'Lincoln High School',
  graduationYear: '2024',
  gpa: '3.85',
  satScore: '1450',
  actScore: '32',
  bio: 'Passionate student interested in computer science and artificial intelligence. Active in robotics club and volunteer work.',
  interests: ['Computer Science', 'Robotics', 'Music', 'Volunteer Work', 'Basketball'],
  targetMajors: ['Computer Science', 'Software Engineering', 'Data Science'],
  collegePreferences: {
    size: 'medium',
    location: 'urban',
    type: 'research'
  }
};

export const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile>(mockProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(mockProfile);

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayInputChange = (field: 'interests' | 'targetMajors', value: string) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item);
    setEditedProfile(prev => ({
      ...prev,
      [field]: items
    }));
  };

  const handlePreferenceChange = (field: keyof UserProfile['collegePreferences'], value: string) => {
    setEditedProfile(prev => ({
      ...prev,
      collegePreferences: {
        ...prev.collegePreferences,
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold gradient-text-primary mb-2">Profile Settings</h1>
          <p className="text-gray-400">Manage your personal information and preferences</p>
        </div>
        <div className="flex gap-3">
          {!isEditing ? (
            <Button 
              onClick={() => setIsEditing(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <i className="ri-edit-line w-4 h-4 flex items-center justify-center mr-2"></i>
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button 
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <i className="ri-save-line w-4 h-4 flex items-center justify-center mr-2"></i>
                Save Changes
              </Button>
              <Button 
                onClick={handleCancel}
                className="bg-gray-600 hover:bg-gray-700 text-white"
              >
                <i className="ri-close-line w-4 h-4 flex items-center justify-center mr-2"></i>
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Profile Header */}
      <Card className="p-6 card-gradient">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-3xl font-bold text-white">
              {profile.firstName[0]}{profile.lastName[0]}
            </span>
          </div>
          <div>
            <h2 className="text-2xl font-bold gradient-text-neural">{profile.firstName} {profile.lastName}</h2>
            <p className="text-gray-400">{profile.email}</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-sm text-gray-400">{profile.highSchool}</span>
              <span className="text-gray-600">•</span>
              <span className="text-sm text-gray-400">Class of {profile.graduationYear}</span>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card className="p-6 card-gradient">
          <h3 className="text-lg font-semibold gradient-text-secondary mb-4">Personal Information</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">First Name</label>
                {isEditing ? (
                  <Input
                    value={editedProfile.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full"
                  />
                ) : (
                  <p className="text-white">{profile.firstName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Last Name</label>
                {isEditing ? (
                  <Input
                    value={editedProfile.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full"
                  />
                ) : (
                  <p className="text-white">{profile.lastName}</p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              {isEditing ? (
                <Input
                  type="email"
                  value={editedProfile.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full"
                />
              ) : (
                <p className="text-white">{profile.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
              {isEditing ? (
                <Input
                  value={editedProfile.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full"
                />
              ) : (
                <p className="text-white">{profile.phone}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Date of Birth</label>
              {isEditing ? (
                <Input
                  type="date"
                  value={editedProfile.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className="w-full"
                />
              ) : (
                <p className="text-white">{new Date(profile.dateOfBirth).toLocaleDateString()}</p>
              )}
            </div>
          </div>
        </Card>

        {/* Academic Information */}
        <Card className="p-6 card-gradient">
          <h3 className="text-lg font-semibold gradient-text-accent mb-4">Academic Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">High School</label>
              {isEditing ? (
                <Input
                  value={editedProfile.highSchool}
                  onChange={(e) => handleInputChange('highSchool', e.target.value)}
                  className="w-full"
                />
              ) : (
                <p className="text-white">{profile.highSchool}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Graduation Year</label>
              {isEditing ? (
                <Input
                  value={editedProfile.graduationYear}
                  onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                  className="w-full"
                />
              ) : (
                <p className="text-white">{profile.graduationYear}</p>
              )}
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">GPA</label>
                {isEditing ? (
                  <Input
                    value={editedProfile.gpa}
                    onChange={(e) => handleInputChange('gpa', e.target.value)}
                    className="w-full"
                  />
                ) : (
                  <p className="text-white">{profile.gpa}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">SAT Score</label>
                {isEditing ? (
                  <Input
                    value={editedProfile.satScore}
                    onChange={(e) => handleInputChange('satScore', e.target.value)}
                    className="w-full"
                  />
                ) : (
                  <p className="text-white">{profile.satScore}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">ACT Score</label>
                {isEditing ? (
                  <Input
                    value={editedProfile.actScore}
                    onChange={(e) => handleInputChange('actScore', e.target.value)}
                    className="w-full"
                  />
                ) : (
                  <p className="text-white">{profile.actScore}</p>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Bio & Interests */}
        <Card className="p-6 card-gradient">
          <h3 className="text-lg font-semibold gradient-text-neural mb-4">About Me</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Bio</label>
              {isEditing ? (
                <textarea
                  value={editedProfile.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  className="w-full p-3 bg-dark-300 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none resize-none h-24"
                  maxLength={500}
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-white">{profile.bio}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Interests</label>
              {isEditing ? (
                <Input
                  value={editedProfile.interests.join(', ')}
                  onChange={(e) => handleArrayInputChange('interests', e.target.value)}
                  className="w-full"
                  placeholder="Separate interests with commas"
                />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest, index) => (
                    <span key={index} className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm border border-purple-500/30">
                      {interest}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Target Majors</label>
              {isEditing ? (
                <Input
                  value={editedProfile.targetMajors.join(', ')}
                  onChange={(e) => handleArrayInputChange('targetMajors', e.target.value)}
                  className="w-full"
                  placeholder="Separate majors with commas"
                />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profile.targetMajors.map((major, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-500/30">
                      {major}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* College Preferences */}
        <Card className="p-6 card-gradient">
          <h3 className="text-lg font-semibold gradient-text-primary mb-4">College Preferences</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Preferred Size</label>
              {isEditing ? (
                <select
                  value={editedProfile.collegePreferences.size}
                  onChange={(e) => handlePreferenceChange('size', e.target.value)}
                  className="w-full p-3 bg-dark-300 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none pr-8"
                >
                  <option value="small">Small (&lt; 5,000)</option>
                  <option value="medium">Medium (5,000-15,000)</option>
                  <option value="large">Large (&gt; 15,000)</option>
                </select>
              ) : (
                <p className="text-white capitalize">{profile.collegePreferences.size}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Location Preference</label>
              {isEditing ? (
                <select
                  value={editedProfile.collegePreferences.location}
                  onChange={(e) => handlePreferenceChange('location', e.target.value)}
                  className="w-full p-3 bg-dark-300 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none pr-8"
                >
                  <option value="urban">Urban</option>
                  <option value="suburban">Suburban</option>
                  <option value="rural">Rural</option>
                </select>
              ) : (
                <p className="text-white capitalize">{profile.collegePreferences.location}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Institution Type</label>
              {isEditing ? (
                <select
                  value={editedProfile.collegePreferences.type}
                  onChange={(e) => handlePreferenceChange('type', e.target.value)}
                  className="w-full p-3 bg-dark-300 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none pr-8"
                >
                  <option value="research">Research University</option>
                  <option value="liberal_arts">Liberal Arts College</option>
                  <option value="community">Community College</option>
                  <option value="technical">Technical Institute</option>
                </select>
              ) : (
                <p className="text-white capitalize">{profile.collegePreferences.type.replace('_', ' ')}</p>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Account Settings */}
      <Card className="p-6 card-gradient">
        <h3 className="text-lg font-semibold gradient-text-secondary mb-4">Account Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <i className="ri-lock-line w-4 h-4 flex items-center justify-center mr-2"></i>
            Change Password
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <i className="ri-download-line w-4 h-4 flex items-center justify-center mr-2"></i>
            Export Data
          </Button>
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            <i className="ri-delete-bin-line w-4 h-4 flex items-center justify-center mr-2"></i>
            Delete Account
          </Button>
        </div>
      </Card>
    </div>
  );
};
