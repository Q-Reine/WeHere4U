import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User, Heart, Settings } from "lucide-react";


const UserDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [textSize, setTextSize] = useState("normal");
  
  return (
    <div className={`p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <h2 className="text-2xl font-bold mb-4">User Dashboard</h2>
      
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile"><User className="mr-2" /> Profile</TabsTrigger>
          <TabsTrigger value="donations"><Heart className="mr-2" /> Donations</TabsTrigger>
          <TabsTrigger value="settings"><Settings className="mr-2" /> Accessibility</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardContent>
              <h3 className="text-xl font-semibold">Order History</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>#1234</TableCell>
                    <TableCell>March 10, 2025</TableCell>
                    <TableCell>Completed</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="donations">
          <Card>
            <CardContent>
              <h3 className="text-xl font-semibold">Donation Campaigns</h3>
              <div className="mb-2">Campaign: "Help Build a School"</div>
              <Progress value={70} />
              <p className="text-sm mt-2">70% funded</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardContent>
              <h3 className="text-xl font-semibold">Accessibility Settings</h3>
              <div className="flex items-center justify-between mb-4">
                <span>Dark Mode</span>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
              <div className="flex items-center justify-between">
                <span>Text Size</span>
                <select
                  value={textSize}
                  onChange={(e) => setTextSize(e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option value="small">Small</option>
                  <option value="normal">Normal</option>
                  <option value="large">Large</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;
