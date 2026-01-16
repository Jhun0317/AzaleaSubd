"use client"

import React, { useState, useEffect } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { base44 } from "@/api/base44Client"
import { format } from "date-fns"
import {
  Settings,
  CreditCard,
  Bell,
  FileText,
  Save,
  Plus,
  Upload,
  CheckCircle2,
  XCircle,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { toast } from "sonner"

/* ✅ TYPE DEFINITIONS (ONCE, HERE) */
type DuesSetting = {
  id?: string
  monthly_amount?: number
  due_day?: number
  late_fee?: number
  grace_period_days?: number
  gcash_number?: string
  bank_details?: string
}

export default function AdminSettings() {
  const [duesData, setDuesData] = useState({
    monthly_amount: "",
    due_day: 15,
    late_fee: "",
    grace_period_days: 5,
    gcash_number: "",
    bank_details: "",
  })

  const [showAnnouncementDialog, setShowAnnouncementDialog] = useState(false)
  const [announcementData, setAnnouncementData] = useState({
    title: "",
    content: "",
    priority: "normal",
    category: "general",
    is_pinned: false,
  })

  const [showDocumentDialog, setShowDocumentDialog] = useState(false)
  const [documentData, setDocumentData] = useState({
    title: "",
    description: "",
    category: "other",
    file_url: "",
    is_public: true,
  })

  const [uploading, setUploading] = useState(false)

  const queryClient = useQueryClient()

  const { data: duesSetting } = useQuery<DuesSetting | null>({
    queryKey: ["duesSetting"],
    queryFn: async () => {
      const settings = await base44.entities.DuesSetting.list(
        "-effective_date",
        1
      )
      return (settings[0] as DuesSetting) || null
    },
  })

  const { data: pendingPayments = [] } = useQuery({
    queryKey: ["pendingPayments"],
    queryFn: () =>
      base44.entities.Payment.filter(
        { status: "pending" },
        "-created_date",
        100
      ),
  })

  const { data: residents = [] } = useQuery({
    queryKey: ["allResidents"],
    queryFn: () =>
      base44.entities.Resident.list("-created_date", 500),
  })

  useEffect(() => {
    if (duesSetting) {
      setDuesData({
        monthly_amount: duesSetting.monthly_amount?.toString() || "",
        due_day: duesSetting.due_day || 15,
        late_fee: duesSetting.late_fee?.toString() || "",
        grace_period_days: duesSetting.grace_period_days || 5,
        gcash_number: duesSetting.gcash_number || "",
        bank_details: duesSetting.bank_details || "",
      })
    }
  }, [duesSetting])

  /* rest of your component stays the same */
}
