"use client";
import React from "react";
import { User as UserIcon, Bell, Shield, Palette, Loader2 } from "lucide-react";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  profileUpdateSchema, 
  ProfileUpdateInput, 
  changePasswordSchema, 
  ChangePasswordInput 
} from "@/interfaces/auth";
import { authClient, useSession } from "@/lib/auth/client";
import { toast } from "sonner";

const SystemSettingContent = () => {
  const { data: session, isPending: isSessionLoading } = useSession();

  // Profile Form
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors, isSubmitting: isProfileSubmitting },
    reset: resetProfile,
  } = useForm<ProfileUpdateInput>({
    resolver: zodResolver(profileUpdateSchema),
    values: {
      name: session?.user?.name || "",
      image: session?.user?.image || "",
    },
  });

  // Password Form
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting },
    reset: resetPassword,
  } = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onProfileUpdate = async (values: ProfileUpdateInput) => {
    try {
      const { error } = await authClient.updateUser({
        name: values.name,
        image: values.image,
      });

      if (error) {
        toast.error(error.message || "Failed to update profile node.");
        return;
      }

      toast.success("Profile metadata updated successfully.");
    } catch (err) {
      toast.error("An unexpected exception occurred during profile update.");
    }
  };

  const onPasswordChange = async (values: ChangePasswordInput) => {
    try {
      const { error } = await authClient.changePassword({
        newPassword: values.newPassword,
        currentPassword: values.currentPassword,
        revokeOtherSessions: true,
      });

      if (error) {
        toast.error(error.message || "Failed to re-initialize security keys.");
        return;
      }

      toast.success("Security keys re-initialized. Active sessions revoked.");
      resetPassword();
    } catch (err) {
      toast.error("An unexpected exception occurred during key rotation.");
    }
  };

  if (isSessionLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
        <Loader2 className="animate-spin text-zinc-900" size={32} />
        <p className="font-mono text-xs font-bold text-muted-foreground">Synchronizing Node...</p>
      </div>
    );
  }

  return (
    <section className="w-full max-w-2xl mx-auto pb-20">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 font-mono tracking-tight">System Settings</h1>
        <p className="text-sm text-gray-600 font-mono">Manage your account nodes and application protocols</p>
      </div>

      <div className="space-y-6">
        {/* Profile Settings */}
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-50 border border-gray-100">
                <UserIcon size={20} className="text-gray-600" />
              </div>
              <div>
                <CardTitle className="font-mono text-sm font-bold">Profile Configuration</CardTitle>
                <CardDescription className="text-xs">Update your personal metadata</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfileSubmit(onProfileUpdate)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-mono font-bold">Name Identifier</Label>
                <Input 
                  id="name" 
                  {...registerProfile("name")}
                  placeholder="John Doe" 
                  className={`font-mono text-sm ${profileErrors.name ? "border-rose-500" : ""}`}
                />
                {profileErrors.name && <p className="text-[10px] font-mono text-rose-600 font-bold">{profileErrors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-mono font-bold">Email (Read-only)</Label>
                <Input 
                  id="email" 
                  value={session?.user?.email || ""} 
                  disabled 
                  className="font-mono text-sm bg-gray-50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image" className="text-xs font-mono font-bold">Avatar URL</Label>
                <Input 
                  id="image" 
                  {...registerProfile("image")}
                  placeholder="https://example.com/avatar.png" 
                  className={`font-mono text-sm ${profileErrors.image ? "border-rose-500" : ""}`}
                />
                {profileErrors.image && <p className="text-[10px] font-mono text-rose-600 font-bold">{profileErrors.image.message}</p>}
              </div>
              <Button 
                type="submit"
                disabled={isProfileSubmitting}
                className="bg-gray-900 text-white hover:bg-gray-800 font-mono text-xs font-bold px-6"
              >
                {isProfileSubmitting ? <Loader2 className="animate-spin mr-2" size={14} /> : null}
                Save Metadata
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-50 border border-gray-100">
                <Shield size={20} className="text-gray-600" />
              </div>
              <div>
                <CardTitle className="font-mono text-sm font-bold">Security Protocols</CardTitle>
                <CardDescription className="text-xs">Rotate your security keys</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordSubmit(onPasswordChange)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" title="Current Key" className="text-xs font-mono font-bold">Current Security Key</Label>
                <Input 
                  id="currentPassword" 
                  type="password" 
                  {...registerPassword("currentPassword")}
                  placeholder="••••••••" 
                  className={`font-mono text-sm ${passwordErrors.currentPassword ? "border-rose-500" : ""}`}
                />
                {passwordErrors.currentPassword && <p className="text-[10px] font-mono text-rose-600 font-bold">{passwordErrors.currentPassword.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword" title="New Key" className="text-xs font-mono font-bold">New Security Key</Label>
                <Input 
                  id="newPassword" 
                  type="password" 
                  {...registerPassword("newPassword")}
                  placeholder="••••••••" 
                  className={`font-mono text-sm ${passwordErrors.newPassword ? "border-rose-500" : ""}`}
                />
                {passwordErrors.newPassword && <p className="text-[10px] font-mono text-rose-600 font-bold">{passwordErrors.newPassword.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" title="Confirm Key" className="text-xs font-mono font-bold">Confirm New Key</Label>
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  {...registerPassword("confirmPassword")}
                  placeholder="••••••••" 
                  className={`font-mono text-sm ${passwordErrors.confirmPassword ? "border-rose-500" : ""}`}
                />
                {passwordErrors.confirmPassword && <p className="text-[10px] font-mono text-rose-600 font-bold">{passwordErrors.confirmPassword.message}</p>}
              </div>
              <Button 
                type="submit"
                disabled={isPasswordSubmitting}
                className="bg-gray-900 text-white hover:bg-gray-800 font-mono text-xs font-bold px-6"
              >
                {isPasswordSubmitting ? <Loader2 className="animate-spin mr-2" size={14} /> : null}
                Rotate Keys
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-50 border border-gray-100">
                <Bell size={20} className="text-gray-600" />
              </div>
              <div>
                <CardTitle className="font-mono text-sm font-bold">Notification Nodes</CardTitle>
                <CardDescription className="text-xs">Manage transmission preferences</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-50 pb-4">
              <div>
                <p className="font-mono text-xs font-bold text-gray-900">Email Transmissions</p>
                <p className="text-[10px] text-gray-600 font-mono">Receive automated activity logs via email</p>
              </div>
              <Checkbox id="email-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between border-b border-gray-50 pb-4">
              <div>
                <p className="font-mono text-xs font-bold text-gray-900">Push Protocols</p>
                <p className="text-[10px] text-gray-600 font-mono">Receive real-time edge notifications</p>
              </div>
              <Checkbox id="push-notifications" />
            </div>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-50 border border-gray-100">
                <Palette size={20} className="text-gray-600" />
              </div>
              <div>
                <CardTitle className="font-mono text-sm font-bold">Interface Parameters</CardTitle>
                <CardDescription className="text-xs">Customize the visual runtime</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-xs font-bold text-gray-900">Theme Engine</p>
                <p className="text-[10px] text-gray-600 font-mono">Light-spec is currently active</p>
              </div>
              <Button variant="outline" size="sm" disabled className="font-mono text-[10px] font-bold">
                Light_spec
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SystemSettingContent;
