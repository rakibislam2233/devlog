"use client";
import React from "react";
import { Search, Filter, Calendar, Clock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ArchiveLogsContent = () => {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Archive Logs</h1>
        <p className="text-gray-600">View and manage your archived journal entries</p>
      </div>

      {/* Actions Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              placeholder="Search logs..."
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter size={16} className="mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Logs List */}
      <div className="space-y-4">
        {/* Log Item 1 */}
        <Card className="bg-white border-gray-200 hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <FileText size={20} className="text-gray-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Project Documentation</CardTitle>
                  <CardDescription className="mt-1">Technical documentation for Project Alpha</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Filter size={16} />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar size={14} />
                <span>June 1, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} />
                <span>2:30 PM</span>
              </div>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">Documentation</span>
            </div>
          </CardContent>
        </Card>

        {/* Log Item 2 */}
        <Card className="bg-white border-gray-200 hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <FileText size={20} className="text-gray-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Meeting Notes</CardTitle>
                  <CardDescription className="mt-1">Weekly team sync meeting notes</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Filter size={16} />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar size={14} />
                <span>May 28, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} />
                <span>10:00 AM</span>
              </div>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">Meeting</span>
            </div>
          </CardContent>
        </Card>

        {/* Log Item 3 */}
        <Card className="bg-white border-gray-200 hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <FileText size={20} className="text-gray-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Code Review Summary</CardTitle>
                  <CardDescription className="mt-1">Review of backend API changes</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Filter size={16} />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar size={14} />
                <span>May 25, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} />
                <span>4:15 PM</span>
              </div>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">Review</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ArchiveLogsContent;
