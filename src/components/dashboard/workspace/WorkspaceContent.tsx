"use client";
import React from "react";
import { Plus, Search, Filter, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const WorkspaceContent = () => {
  return (
    <section className="p-4 md:p-8">
      {/* Header */}
      <header className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Dev Logs</h1>
        <p className="text-gray-600">Track your daily development work, learnings, and progress</p>
      </header>

      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              placeholder="Search projects..."
              className="pl-10 w-full sm:w-64"
            />
          </div>
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Filter size={16} className="mr-2" />
            Filter
          </Button>
        </div>
        <Button className="bg-gray-900 text-white hover:bg-gray-800 w-full sm:w-auto">
          <Plus size={16} className="mr-2" />
          New Project
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Project Card 1 */}
        <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">Project Alpha</CardTitle>
                <CardDescription className="mt-1">Frontend Development</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                <MoreVertical size={16} />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium">75%</span>
              </div>
              <div className="w-full bg-gray-200 -full h-2">
                <div className="bg-gray-900 h-2 -full" style={{ width: "75%" }}></div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>12 tasks</span>
                <span>3 members</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Card 2 */}
        <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">Project Beta</CardTitle>
                <CardDescription className="mt-1">Backend API</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                <MoreVertical size={16} />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium">45%</span>
              </div>
              <div className="w-full bg-gray-200 -full h-2">
                <div className="bg-gray-900 h-2 -full" style={{ width: "45%" }}></div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>8 tasks</span>
                <span>2 members</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Card 3 */}
        <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">Project Gamma</CardTitle>
                <CardDescription className="mt-1">UI/UX Design</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                <MoreVertical size={16} />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium">90%</span>
              </div>
              <div className="w-full bg-gray-200 -full h-2">
                <div className="bg-gray-900 h-2 -full" style={{ width: "90%" }}></div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>15 tasks</span>
                <span>4 members</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default WorkspaceContent;
