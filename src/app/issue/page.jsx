'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Plus, Bug, Lightbulb, HelpCircle } from 'lucide-react'

// Mock GitHub API response
const mockIssues = [
  { id: 1, title: 'App crashes on startup', created_at: '2023-05-01', state: 'open', labels: ['bug'] },
  { id: 2, title: 'Add dark mode support', created_at: '2023-05-02', state: 'open', labels: ['enhancement'] },
  { id: 3, title: 'How to configure API keys?', created_at: '2023-05-03', state: 'open', labels: ['question'] },
  { id: 4, title: 'Improve error handling', created_at: '2023-05-04', state: 'closed', labels: ['bug', 'good first issue'] },
  { id: 5, title: 'Implement user authentication', created_at: '2023-05-05', state: 'open', labels: ['enhancement', 'help wanted'] },
  { id: 6, title: 'Best practices for state management?', created_at: '2023-05-06', state: 'closed', labels: ['question'] },
  // Add more mock issues as needed
]

const ITEMS_PER_PAGE = 5

export default function RepositoryIssues() {
  const [activeTab, setActiveTab] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [issues, setIssues] = useState(mockIssues)

  useEffect(() => {
    // In a real application, you would fetch issues from the GitHub API here
    // For now, we'll use the mock data
    setIssues(mockIssues)
  }, [])

  const filterIssues = (category) => {
    if (category === 'all') return issues
    const labelMap = { bugs: 'bug', features: 'enhancement', questions: 'question' }
    return issues.filter(issue => issue.labels.includes(labelMap[category]))
  }

  const filteredIssues = filterIssues(activeTab)
  const totalPages = Math.ceil(filteredIssues.length / ITEMS_PER_PAGE)
  const paginatedIssues = filteredIssues.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'bugs': return <Bug className="w-4 h-4" />
      case 'features': return <Lightbulb className="w-4 h-4" />
      case 'questions': return <HelpCircle className="w-4 h-4" />
      default: return <AlertCircle className="w-4 h-4" />
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Repository Issues</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create New Issue
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="bugs">Bugs</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
        </TabsList>
        {['all', 'bugs', 'features', 'questions'].map((category) => (
          <TabsContent key={category} value={category}>
            {paginatedIssues.map((issue) => (
              <Card key={issue.id} className="mb-4">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    {getCategoryIcon(category)}
                    <span className="ml-2">{issue.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">Created on: {new Date(issue.created_at).toLocaleDateString()}</p>
                  <div className="flex mt-2">
                    {issue.labels.map((label) => (
                      <Badge key={label} variant="secondary" className="mr-2">
                        {label}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Badge variant={issue.state === 'open' ? 'default' : 'secondary'}>
                    {issue.state}
                  </Badge>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>

      <div className="flex justify-between items-center mt-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
