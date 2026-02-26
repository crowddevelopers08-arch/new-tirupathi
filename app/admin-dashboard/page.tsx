"use client";

import { useState, useEffect, Fragment } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Download,
  Phone,
  Mail,
  Calendar,
  RefreshCw,
  Users,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  MapPin,
  MoreVertical,
  Baby,
  Scissors,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/* ---------- Types ---------- */
type UIStatus = "new" | "contacted" | "scheduled" | "converted" | "lost";

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  treatment?: string;
  message?: string;
  city?: string;
  age?: string;
  pincode?: string;
  hairLossStage?: string;
  concerns?: string;
  hairProblems?: string;
  consent: boolean;
  source?: string;
  formName?: string;
  status: string;
  telecrmSynced: boolean;
  telecrmId?: string;
  
  // Smile Baby fields
  whatsappNumber?: string;
  womansAgeBracket?: string;
  tryingDuration?: string;
  isWhatsapp?: string;
  
  createdAt: string;
  updatedAt: string;
}

/* ---------- Helpers ---------- */
const dbToUIStatus = (v?: string): UIStatus =>
  (v?.toLowerCase() as UIStatus) ?? "new";

const uiToDbStatus = (v: UIStatus) => v.toUpperCase();

const safe = (v?: string) => (v ? v.toLowerCase() : "");

/* ---------- Component ---------- */
export default function LeadsTable({
  initialLeads = [],
  autoRefresh = false,
  refreshInterval = 30000,
}: {
  initialLeads?: Lead[];
  autoRefresh?: boolean;
  refreshInterval?: number;
}) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [treatmentFilter, setTreatmentFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [formFilter, setFormFilter] = useState("all");
  const [expandedLead, setExpandedLead] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Lead;
    direction: "asc" | "desc";
  } | null>(null);

  useEffect(() => setIsClient(true), []);

  /* ---------- Fetch Leads ---------- */
  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/leads");
      const data = await res.json();
      if (res.ok && data.success) {
        setLeads(data.leads || []);
      } else {
        console.error('Failed to fetch leads:', data.error);
        setLeads([]);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(fetchLeads, refreshInterval);
    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval]);

  /* ---------- Sorting ---------- */
  const handleSort = (key: keyof Lead) => {
    setSortConfig((prev) => ({
      key,
      direction: prev?.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedLeads = [...leads].sort((a, b) => {
    if (!sortConfig) return 0;
    let aVal = a[sortConfig.key];
    let bVal = b[sortConfig.key];
    if (sortConfig.key === "createdAt" || sortConfig.key === "updatedAt") {
      aVal = new Date(aVal as string).getTime();
      bVal = new Date(bVal as string).getTime();
    } else {
      aVal = (aVal ?? "").toString().toLowerCase();
      bVal = (bVal ?? "").toString().toLowerCase();
    }
    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : 1;
    return 0;
  });

  /* ---------- Filters ---------- */
  const isWithinDateRange = (date: string, range: string) => {
    const d = new Date(date);
    const now = new Date();
    if (range === "today") return d.toDateString() === now.toDateString();
    if (range === "week") {
      const w = new Date(now);
      w.setDate(now.getDate() - 7);
      return d >= w;
    }
    if (range === "month") {
      const m = new Date(now);
      m.setMonth(now.getMonth() - 1);
      return d >= m;
    }
    return true;
  };

  const filteredLeads = sortedLeads.filter((l) => {
    const uiStatus = dbToUIStatus(l.status);
    const matchesSearch =
      safe(l.name).includes(safe(searchTerm)) ||
      safe(l.phone).includes(safe(searchTerm)) ||
      safe(l.email).includes(safe(searchTerm)) ||
      safe(l.treatment).includes(safe(searchTerm)) ||
      safe(l.message).includes(safe(searchTerm)) ||
      safe(l.city).includes(safe(searchTerm)) ||
      safe(l.formName).includes(safe(searchTerm)) ||
      safe(l.hairLossStage).includes(safe(searchTerm)) ||
      safe(l.concerns).includes(safe(searchTerm)) ||
      safe(l.womansAgeBracket).includes(safe(searchTerm)) ||
      safe(l.tryingDuration).includes(safe(searchTerm));
    
    const matchesStatus = statusFilter === "all" || uiStatus === statusFilter;
    const matchesTreatment =
      treatmentFilter === "all" || l.treatment === treatmentFilter;
    const matchesDate =
      dateFilter === "all" || isWithinDateRange(l.createdAt, dateFilter);
    const matchesForm = formFilter === "all" || l.formName === formFilter;
    
    return (
      matchesSearch && matchesStatus && matchesTreatment && matchesDate && matchesForm
    );
  });

  /* ---------- UI Helpers ---------- */
  const getStatusBadge = (status: UIStatus) => {
    const map = {
      new: "bg-blue-100 text-blue-800 border-blue-200",
      contacted: "bg-yellow-100 text-yellow-800 border-yellow-200",
      scheduled: "bg-purple-100 text-purple-800 border-purple-200",
      converted: "bg-green-100 text-green-800 border-green-200",
      lost: "bg-red-100 text-red-800 border-red-200",
    } as const;
    return (
      <Badge variant="outline" className={`${map[status]} border`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getFormBadge = (name?: string) => {
    if (!name)
      return (
        <Badge className="bg-gray-100 text-gray-700 border-gray-200">
          Unknown
        </Badge>
      );
    
    const n = name.toLowerCase();
    
    const map: Record<string, { label: string; color: string; icon?: any }> = {
      "website leads": {
        label: "Hair Consultation",
        color: "bg-purple-100 text-purple-800 border-purple-200",
        icon: Scissors
      },
      "smile baby": {
        label: "Smile Baby IVF",
        color: "bg-pink-100 text-pink-800 border-pink-200",
        icon: Baby
      },
      "website leads": {
        label: "Website Leads",
        color: "bg-blue-100 text-blue-800 border-blue-200",
      },
    };
    
    const cfg = map[n] || {
      label: name,
      color: "bg-gray-100 text-gray-800 border-gray-200",
    };
    
    return (
      <Badge variant="outline" className={`${cfg.color} border text-xs flex items-center gap-1`}>
        {cfg.icon && <cfg.icon className="h-3 w-3" />}
        {cfg.label}
      </Badge>
    );
  };

  const getTelecrmBadge = (v: boolean) =>
    v ? (
      <Badge className="bg-green-100 text-green-800 border-green-200">
        Synced
      </Badge>
    ) : (
      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
        Pending
      </Badge>
    );

  // const updateLeadStatus = async (id: string, status: UIStatus) => {
  //   try {
  //     const res = await fetch(`/api/leads/${id}`, {
  //       method: "PATCH",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ status: uiToDbStatus(status) }),
  //     });
  //     const data = await res.json();
  //     if (res.ok && data.success) {
  //       setLeads((prev) =>
  //         prev.map((l) =>
  //           l.id === id ? { ...l, status: uiToDbStatus(status) } : l
  //         )
  //       );
  //     }
  //   } catch (error) {
  //     console.error('Error updating status:', error);
  //   }
  // };

    // Update this function in your LeadsTable component
const updateLeadStatus = async (id: string, status: UIStatus) => {
  try {
    const res = await fetch(`/api/leads?id=${id}`, {  // ✅ Fixed: using query parameter
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: uiToDbStatus(status) }),
    });
    
    const data = await res.json();
    
    if (res.ok && data.success) {
      setLeads((prev) =>
        prev.map((l) =>
          l.id === id ? { ...l, status: uiToDbStatus(status) } : l
        )
      );
    } else {
      console.error('Failed to update status:', data.error);
    }
  } catch (error) {
    console.error('Error updating status:', error);
  }
};

  const formatDate = (d: string) => {
    if (!isClient || !d) return { date: "", time: "" };
    const dt = new Date(d);
    return {
      date: dt.toLocaleDateString("en-IN"),
      time: dt.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const toggleLeadExpansion = (id: string) =>
    setExpandedLead((c) => (c === id ? null : id));

  const handleCall = (p?: string) => p && window.open(`tel:${p}`, "_self");
  const handleEmail = (e?: string) => e && window.open(`mailto:${e}`, "_self");
  
  const uniqueFormNames = Array.from(
    new Set(leads.map((l) => l.formName).filter(Boolean))
  );

  /* ---------- CSV Export ---------- */
  const exportToCSV = () => {
    const headers = [
      "Name", "Phone", "Email", "Treatment", "Concerns",
      "Message", "City", "Pincode", "Status", "Form Name", "Source", 
      "TeleCRM Synced", "Created At"
    ];
    
    const rows = filteredLeads.map((l) => {
      return [
        l.name ?? "",
        l.phone ?? "",
        l.email ?? "",
        l.treatment ?? "",
        l.concerns ?? "",
        `"${(l.message || l.hairProblems || "").replace(/"/g, '""')}"`,
        l.city ?? "",
        l.pincode ?? "",
        dbToUIStatus(l.status),
        l.formName ?? "",
        l.source ?? "",
        l.telecrmSynced ? "Yes" : "No",
        isClient ? new Date(l.createdAt).toLocaleString("en-IN") : l.createdAt,
      ];
    });
    
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Get form statistics
  const getFormStats = () => {
    const stats: { [key: string]: { total: number, new: number } } = {}
    
    leads.forEach(lead => {
      const formName = lead.formName || 'Unknown'
      if (!stats[formName]) {
        stats[formName] = { total: 0, new: 0 }
      }
      
      stats[formName].total++
      if (lead.status === 'NEW') stats[formName].new++
    })
    
    return stats
  }

  const formStats = getFormStats();

  /* ---------- Render ---------- */
  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-3 md:p-4 lg:p-6">
      <Card className="border-0 sm:border shadow-none sm:shadow-sm">
        <CardHeader className="px-3 py-4 sm:px-6 sm:py-6">
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold">
                    Leads Management
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Manage and track all consultation requests from your website
                  </CardDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    onClick={fetchLeads}
                    disabled={loading}
                    size="sm"
                    className="flex-1 sm:flex-none"
                  >
                    <RefreshCw
                      className={`h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 ${
                        loading ? "animate-spin" : ""
                      }`}
                    />
                    <span className="hidden xs:inline">
                      {loading ? "Refreshing..." : "Refresh"}
                    </span>
                    <span className="xs:hidden">Refresh</span>
                  </Button>
                  <Button
                    onClick={exportToCSV}
                    size="sm"
                    className="flex-1 sm:flex-none"
                  >
                    <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                    <span className="hidden xs:inline">Export CSV</span>
                    <span className="xs:hidden">Export</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Form Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {Object.entries(formStats).map(([formName, stats]) => (
                <Card key={formName} className="p-3 bg-white border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        {formName.toLowerCase().includes('smile') ? (
                          <Baby className="h-4 w-4 text-pink-600" />
                        ) : formName.toLowerCase().includes('hair') ? (
                          <Scissors className="h-4 w-4 text-purple-600" />
                        ) : (
                          <Users className="h-4 w-4 text-blue-600" />
                        )}
                        <span className="font-medium text-xs text-gray-900">
                          {formName.includes('Hair') ? 'Hair' :
                           formName.includes('Smile') ? 'IVF' :
                           formName.includes('website') ? 'Website' :
                           formName}
                        </span>
                      </div>
                      <div className="text-xl font-bold text-gray-900">{stats.total}</div>
                    </div>
                    <div className="text-right text-xs">
                      <div className="flex items-center gap-1 justify-end">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-600">New: {stats.new}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Filter Section */}
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-6 gap-3 p-3 sm:p-4 bg-gray-50/50 rounded-lg border">
              <div className="relative lg:col-span-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search name, phone, email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-sm h-10"
                />
              </div>
              <div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="h-10 text-sm">
                    <div className="flex items-center">
                      <Filter className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">Status</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="converted">Converted</SelectItem>
                    <SelectItem value="lost">Lost</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={treatmentFilter} onValueChange={setTreatmentFilter}>
                  <SelectTrigger className="h-10 text-sm">
                    <div className="flex items-center">
                      <span className="truncate">Treatment</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Treatments</SelectItem>
                    <SelectItem value="Hair Transplant">Hair Transplant</SelectItem>
                    <SelectItem value="Hair Loss Treatment">Hair Loss</SelectItem>
                    <SelectItem value="Baldness Treatment">Baldness</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={formFilter} onValueChange={setFormFilter}>
                  <SelectTrigger className="h-10 text-sm">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">Form</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Forms</SelectItem>
                    {uniqueFormNames.map((f) => (
                      <SelectItem key={f} value={f!} className="truncate max-w-[200px]">
                        {f?.includes('Hair') ? 'Hair Consultation' :
                         f?.includes('Smile') ? 'Smile Baby IVF' :
                         f?.includes('website') ? 'Website' : f}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="xs:col-span-2 lg:col-span-1">
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="h-10 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">Date</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-3 sm:px-6 pb-6">
          {/* Mobile Cards View */}
          <div className="lg:hidden space-y-3">
            {loading ? (
              <div className="text-center py-8">
                <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2" />
                <p className="text-gray-600">Loading leads...</p>
              </div>
            ) : filteredLeads.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-600">No leads found</p>
              </div>
            ) : (
              filteredLeads.map((lead) => {
                const uiStatus = dbToUIStatus(lead.status);
                const d = formatDate(lead.createdAt);
                const isSmileBaby = lead.formName?.toLowerCase().includes('smile');
                const isHair = lead.formName?.toLowerCase().includes('hair');
                
                return (
                  <Card key={lead.id} className="overflow-hidden">
                    <div
                      className="p-4 cursor-pointer hover:bg-gray-50"
                      onClick={() => toggleLeadExpansion(lead.id)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg truncate">
                            {lead.name || "Unknown"}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            {getStatusBadge(uiStatus)}
                            <span className="text-xs text-gray-600">
                              {d.date}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCall(lead.phone);
                            }}
                            className="h-8 w-8"
                            disabled={!lead.phone}
                          >
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEmail(lead.email);
                            }}
                            className="h-8 w-8"
                            disabled={!lead.email}
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span className="truncate">{lead.phone || "-"}</span>
                        </div>
                        {lead.email && (
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-gray-500" />
                            <span className="truncate">{lead.email}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          {getFormBadge(lead.formName)}
                        </div>
                        {lead.pincode && (
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span>{lead.pincode}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {expandedLead === lead.id && (
                      <div className="border-t p-4 bg-gray-50">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">Lead Details</h4>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div>
                                <p className="font-medium text-gray-700">Form</p>
                                <p className="text-gray-600">{lead.formName || "-"}</p>
                              </div>
                              <div>
                                <p className="font-medium text-gray-700">Source</p>
                                <p className="text-gray-600">{lead.source || "-"}</p>
                              </div>
                              <div>
                                <p className="font-medium text-gray-700">Treatment</p>
                                <p className="text-gray-600">{lead.treatment || "-"}</p>
                              </div>
                              <div>
                                <p className="font-medium text-gray-700">Concerns</p>
                                <p className="text-gray-600">{lead.concerns || "-"}</p>
                              </div>
                              <div>
                                <p className="font-medium text-gray-700">Pincode</p>
                                <p className="text-gray-600">{lead.pincode || "-"}</p>
                              </div>
                              <div>
                                <p className="font-medium text-gray-700">TeleCRM</p>
                                <p className="text-gray-600">
                                  {getTelecrmBadge(lead.telecrmSynced)}
                                </p>
                              </div>
                            </div>
                          </div>
                          {(lead.message || lead.hairProblems) && (
                            <div>
                              <h4 className="font-medium mb-2 flex items-center gap-2">
                                <MessageSquare className="h-4 w-4" />
                                Message
                              </h4>
                              <div className="p-3 border rounded bg-white whitespace-pre-wrap text-sm">
                                {lead.message || lead.hairProblems || "No message"}
                              </div>
                            </div>
                          )}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="sm" variant="outline" className="w-full">
                                <MoreVertical className="h-4 w-4 mr-2" />
                                Update Status
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {["new","contacted","scheduled","converted","lost"].map((s) => (
                                <DropdownMenuItem
                                  key={s}
                                  onClick={() => updateLeadStatus(lead.id, s as UIStatus)}
                                >
                                  {s.charAt(0).toUpperCase() + s.slice(1)}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    )}
                  </Card>
                );
              })
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th
                      className="px-4 py-3 text-left cursor-pointer min-w-[140px]"
                      onClick={() => handleSort("name")}
                    >
                      <div className="flex items-center gap-1">
                        Name
                        {sortConfig?.key === "name" &&
                          (sortConfig.direction === "asc" ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          ))}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left min-w-[160px]">Contact</th>
                    <th className="px-4 py-3 text-left min-w-[180px]">Treatment</th>
                    <th className="px-4 py-3 text-left min-w-[120px]">Form</th>
                    <th className="px-4 py-3 text-left min-w-[100px]">Status</th>
                    <th className="px-4 py-3 text-left min-w-[80px]">Sync</th>
                    <th
                      className="px-4 py-3 text-left cursor-pointer min-w-[120px]"
                      onClick={() => handleSort("createdAt")}
                    >
                      <div className="flex items-center gap-1">
                        Created
                        {sortConfig?.key === "createdAt" &&
                          (sortConfig.direction === "asc" ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          ))}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left min-w-[120px]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center">
                        <RefreshCw className="h-4 w-4 mr-2 inline animate-spin" />
                        Loading leads...
                      </td>
                    </tr>
                  ) : filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-gray-500">
                        No leads found
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => {
                      const uiStatus = dbToUIStatus(lead.status);
                      const d = formatDate(lead.createdAt);
                      
                      return (
                        <Fragment key={lead.id}>
                          <tr
                            className="border-b hover:bg-gray-50 cursor-pointer"
                            onClick={() => toggleLeadExpansion(lead.id)}
                          >
                            <td className="px-4 py-3">
                              <div className="font-medium">{lead.name || "Unknown"}</div>
                              {lead.pincode && (
                                <div className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                                  <MapPin className="h-3 w-3" />
                                  {lead.pincode}
                                </div>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                  <Phone className="h-3.5 w-3.5 text-gray-500" />
                                  <span>{lead.phone || "-"}</span>
                                </div>
                                {lead.email && (
                                  <div className="flex items-center gap-2">
                                    <Mail className="h-3.5 w-3.5 text-gray-500" />
                                    <span className="truncate max-w-[150px]">{lead.email}</span>
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex flex-col">
                                <span>{lead.treatment || "Hair Consultation"}</span>
                                {lead.concerns && (
                                  <span className="text-xs text-gray-600">{lead.concerns}</span>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-3">{getFormBadge(lead.formName)}</td>
                            <td className="px-4 py-3">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <div className="cursor-pointer">
                                    {getStatusBadge(uiStatus)}
                                  </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  {["new","contacted","scheduled","converted","lost"].map((s) => (
                                    <DropdownMenuItem
                                      key={s}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        updateLeadStatus(lead.id, s as UIStatus);
                                      }}
                                    >
                                      {s.charAt(0).toUpperCase() + s.slice(1)}
                                    </DropdownMenuItem>
                                  ))}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                            <td className="px-4 py-3">
                              {getTelecrmBadge(lead.telecrmSynced)}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex flex-col">
                                <span>{d.date}</span>
                                <span className="text-xs text-gray-500">{d.time}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCall(lead.phone);
                                  }}
                                  disabled={!lead.phone}
                                  className="h-8 w-8 p-0"
                                >
                                  <Phone className="h-3 w-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEmail(lead.email);
                                  }}
                                  disabled={!lead.email}
                                  className="h-8 w-8 p-0"
                                >
                                  <Mail className="h-3 w-3" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                          {expandedLead === lead.id && (
                            <tr className="bg-gray-50">
                              <td colSpan={8} className="p-4">
                                <div className="grid grid-cols-2 gap-6">
                                  <div>
                                    <h4 className="font-medium mb-3">Lead Details</h4>
                                    <div className="space-y-2 text-sm">
                                      <div>
                                        <span className="font-medium text-gray-600">Source:</span>{" "}
                                        <span>{lead.source || "-"}</span>
                                      </div>
                                      <div>
                                        <span className="font-medium text-gray-600">Form:</span>{" "}
                                        <span>{lead.formName || "-"}</span>
                                      </div>
                                      <div>
                                        <span className="font-medium text-gray-600">Treatment:</span>{" "}
                                        <span>{lead.treatment || "-"}</span>
                                      </div>
                                      <div>
                                        <span className="font-medium text-gray-600">Concerns:</span>{" "}
                                        <span>{lead.concerns || "-"}</span>
                                      </div>
                                      <div>
                                        <span className="font-medium text-gray-600">Pincode:</span>{" "}
                                        <span>{lead.pincode || "-"}</span>
                                      </div>
                                      <div>
                                        <span className="font-medium text-gray-600">Consent:</span>{" "}
                                        <span>{lead.consent ? "Yes" : "No"}</span>
                                      </div>
                                      {lead.telecrmId && (
                                        <div>
                                          <span className="font-medium text-gray-600">TeleCRM ID:</span>{" "}
                                          <span className="font-mono text-xs">{lead.telecrmId}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-3 flex items-center gap-2">
                                      <MessageSquare className="h-4 w-4" />
                                      Message
                                    </h4>
                                    <div className="p-3 border rounded bg-white whitespace-pre-wrap text-sm max-h-40 overflow-y-auto">
                                      {lead.message || lead.hairProblems || "No message provided"}
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </Fragment>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary */}
          {filteredLeads.length > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 text-sm text-gray-600 gap-2">
              <div>
                Showing {filteredLeads.length} of {leads.length} leads
                {searchTerm && ` • Filtered by: "${searchTerm}"`}
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>New: {leads.filter(l => l.status === 'NEW').length}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Converted: {leads.filter(l => l.status === 'CONVERTED').length}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  <span>Synced: {leads.filter(l => l.telecrmSynced).length}</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}