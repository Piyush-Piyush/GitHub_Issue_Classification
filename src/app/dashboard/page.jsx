'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Search, Star, GitFork, LogOut, User, LayoutDashboard } from 'lucide-react'

// Mock data for repositories
const mockRepositories = [
  { id: 1, name: 'awesome-project', description: 'A really cool project', stars: 120, forks: 35 },
  { id: 2, name: 'react-component-library', description: 'Reusable React components', stars: 89, forks: 12 },
  { id: 3, name: 'node-api-boilerplate', description: 'Starter for Node.js APIs', stars: 56, forks: 8 },
  { id: 4, name: 'python-data-science', description: 'Data science utilities', stars: 234, forks: 67 },
  { id: 5, name: 'go-microservices', description: 'Microservices in Go', stars: 78, forks: 23 },
  { id: 6, name: 'vue-dashboard', description: 'Admin dashboard template', stars: 45, forks: 7 },
]

export default function UserDashboard() {
  const [searchTerm, setSearchTerm] = useState('')
  const username = 'JohnDoe' // This would typically come from your auth system

  const filteredRepositories = mockRepositories.filter(repo =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-100">
        <Sidebar>
          <SidebarHeader>
            <CardTitle className="px-4 py-2">GitHub Issue Manager</CardTitle>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#stats">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Stats
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#profile">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="#logout">
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 overflow-auto">
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">Welcome, {username}!</h1>
              <SidebarTrigger />
            </div>
          </header>

          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="mb-6">
                <Input
                  type="text"
                  placeholder="Search repositories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-md"
                  icon={<Search className="h-4 w-4 text-gray-400" />}
                />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredRepositories.map((repo) => (
                  <Card key={repo.id}>
                    <CardHeader>
                      <CardTitle>{repo.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 mb-4">{repo.description}</p>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span className="flex items-center">
                          <Star className="h-4 w-4 mr-1" />
                          {repo.stars}
                        </span>
                        <span className="flex items-center">
                          <GitFork className="h-4 w-4 mr-1" />
                          {repo.forks}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">View Issues</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
