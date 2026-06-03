"use client";
import React from "react";
import { User, Bell, Shield, Palette, Globe, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const SystemSettingContent = () => {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">System Settings</h1>
        <p className="text-gray-600">Manage your account and application settings</p>
      </div>

      <div className="space-y-6">
        {/* Profile Settings */}
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <User size={20} className="text-gray-600" />
              </div>
              <div>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="john@example.com" type="email" />
            </div>
            <Button className="bg-gray-900 text-white hover:bg-gray-800">
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Bell size={20} className="text-gray-600" />
              </div>
              <div>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Manage your notification preferences</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-600">Receive email updates about your activity</p>
              </div>
              <Checkbox id="email-notifications" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Push Notifications</p>
                <p className="text-sm text-gray-600">Receive push notifications on your device</p>
              </div>
              <Checkbox id="push-notifications" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Weekly Digest</p>
                <p className="text-sm text-gray-600">Receive a weekly summary of your activity</p>
              </div>
              <Checkbox id="weekly-digest" />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Shield size={20} className="text-gray-600" />
              </div>
              <div>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your security preferences</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" type="password" placeholder="••••••••" />
            </div>
            <Button className="bg-gray-900 text-white hover:bg-gray-800">
              Update Password
            </Button>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Palette size={20} className="text-gray-600" />
              </div>
              <div>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize the look and feel</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Theme</p>
                <p className="text-sm text-gray-600">Light mode is currently enabled</p>
              </div>
              <Button variant="outline" size="sm" disabled>
                Light Mode
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemSettingContent;
