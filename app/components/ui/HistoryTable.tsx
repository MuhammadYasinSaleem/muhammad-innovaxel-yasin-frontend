"use client";

import { useState, useEffect } from "react";
import {
  Edit2,
  Trash2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react";
import { apiService, type LinkHistory } from "@/lib/api";

const HistoryTable = () => {
  const [data, setData] = useState<LinkHistory[]>([]);
  const [filteredData, setFilteredData] = useState<LinkHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editUrl, setEditUrl] = useState("");

  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  } | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiService.getAllShortUrls();
      setData(response);
      setFilteredData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data");
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  };
  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedData = [...filteredData].sort((a, b) => {
      const aValue = a[key as keyof LinkHistory];
      const bValue = b[key as keyof LinkHistory];
      if (aValue < bValue) {
        return direction === "ascending" ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    setFilteredData(sortedData);
  };

  const handleDelete = async (shortCode: string) => {
    if (!confirm("Are you sure you want to delete this short URL?")) {
      return;
    }

    try {
      await apiService.deleteShortUrl(shortCode);

      // Update local state
      const updatedData = data.filter((item) => item.shortLink !== shortCode);
      setData(updatedData);
      setFilteredData(updatedData);

      alert("Entry deleted successfully");
    } catch (error) {
      console.error("Error deleting entry:", error);
      alert("Failed to delete entry. Please try again.");
    }
  };

  const handleEdit = (item: LinkHistory) => {
    setEditingId(item._id);
    setEditUrl(item.originalLink);
  };

  const handleSaveEdit = async (shortCode: string) => {
    if (!editUrl.trim()) {
      alert("Please enter a valid URL");
      return;
    }

    try {
      const updatedItem = await apiService.updateShortUrl(shortCode, editUrl);

      // Update local state
      const updatedData = data.map((item) =>
        item.shortLink === shortCode
          ? {
              ...item,
              originalLink: updatedItem.url,
              updatedAt: new Date(updatedItem.updatedAt),
            }
          : item
      );

      setData(updatedData);
      setFilteredData(updatedData);
      setEditingId(null);
      setEditUrl("");

      alert("URL updated successfully");
    } catch (error) {
      console.error("Error updating entry:", error);
      alert("Failed to update entry. Please try again.");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditUrl("");
  };

  const handleRedirect = async (shortCode: string) => {
    try {
      const response = await apiService.getOriginalUrl(shortCode);
      window.open(response.url, "_blank");
    } catch (error) {
      console.error("Error redirecting:", error);
      alert("Failed to redirect. URL might be expired or invalid.");
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 !text-white">
        <div className="bg-[#0d1117] rounded-lg p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading your links...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 !text-white">
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-400">Error: {error}</p>
          <button
            onClick={fetchData}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 !text-white">
      <div className="bg-inherit flex items-center justify-between p-4">
        <h2 className="text-2xl font-bold">History ({filteredData.length})</h2>
        <button
          onClick={fetchData}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
        >
          Refresh
        </button>
      </div>

      <div className="overflow-x-auto">
        <div className="bg-[#0d1117] rounded-lg overflow-hidden shadow-lg">
          {/* Grid Headers - Desktop */}
          <div className="hidden md:grid grid-cols-8 gap-4 p-4 bg-[#181e29] border-b border-[#0f1318]">
            <div
              className="col-span-3 flex items-center cursor-pointer"
              onClick={() => requestSort("shortLink")}
            >
              <span className="text-xs font-medium text-white uppercase">
                Short Link
              </span>
              {sortConfig?.key === "shortLink" &&
                (sortConfig.direction === "ascending" ? (
                  <ChevronUp className="ml-1 w-4 h-4 text-white" />
                ) : (
                  <ChevronDown className="ml-1 w-4 h-4 text-white" />
                ))}
            </div>
            <div
              className="col-span-3 flex items-center cursor-pointer"
              onClick={() => requestSort("originalLink")}
            >
              <span className="text-xs font-medium text-white uppercase">
                Original Link
              </span>
              {sortConfig?.key === "originalLink" &&
                (sortConfig.direction === "ascending" ? (
                  <ChevronUp className="ml-1 w-4 h-4 text-white" />
                ) : (
                  <ChevronDown className="ml-1 w-4 h-4 text-white" />
                ))}
            </div>
            <div
              className="col-span-1 flex items-center cursor-pointer"
              onClick={() => requestSort("clicks")}
            >
              <span className="text-xs font-medium text-white uppercase">
                Clicks
              </span>
              {sortConfig?.key === "clicks" &&
                (sortConfig.direction === "ascending" ? (
                  <ChevronUp className="ml-1 w-4 h-4 text-white" />
                ) : (
                  <ChevronDown className="ml-1 w-4 h-4 text-white" />
                ))}
            </div>
            <div className="col-span-1 flex justify-end">
              <span className="text-xs font-medium text-white uppercase">
                Actions
              </span>
            </div>
          </div>

          {/* Grid Items with vertical scroll */}
          <div className="divide-y divide-[#0f1318] bg-[#0e131e] max-h-[500px]">
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <div
                  key={item._id}
                  className="grid grid-cols-1 md:grid-cols-8 gap-4 p-4 hover:bg-[#161b22] transition-colors"
                >
                  {/* Mobile View - Stacked */}
                  <div className="md:hidden space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-400">Short Link</span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleRedirect(item.shortLink)}
                          className="text-blue-400 hover:underline text-sm flex items-center"
                        >
                          {`${window.location.origin}/${item.shortLink}`}
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-400">
                        Original Link
                      </span>
                      {editingId === item._id ? (
                        <div className="flex items-center space-x-2 max-w-[60%]">
                          <input
                            type="text"
                            value={editUrl}
                            onChange={(e) => setEditUrl(e.target.value)}
                            className="bg-gray-800 text-white px-2 py-1 rounded text-xs flex-1"
                          />
                          <button
                            onClick={() => handleSaveEdit(item.shortLink)}
                            className="text-green-400 text-xs px-2 py-1 bg-green-900/30 rounded"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="text-gray-400 text-xs px-2 py-1 bg-gray-900/30 rounded"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-300 text-sm truncate max-w-[50%]">
                          {item.originalLink}
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-400">Clicks</span>
                      <span className="text-white text-sm">{item.clicks}</span>
                    </div>
                    <div className="flex justify-end space-x-2 pt-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-400 hover:text-blue-300 p-1 rounded hover:bg-blue-900/30"
                        title="Edit"
                        disabled={editingId === item._id}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.shortLink)}
                        className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-900/30"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Desktop View */}
                  <div className="hidden md:grid md:col-span-3">
                    <button
                      onClick={() => handleRedirect(item.shortLink)}
                      className="text-blue-400 hover:text-blue-300 hover:underline truncate text-left flex items-center"
                    >
                      {`${window.location.origin}/${item.shortLink}`}
                      <ExternalLink className="w-3 h-3 ml-1 flex-shrink-0" />
                    </button>
                  </div>
                  <div className="hidden md:grid md:col-span-3">
                    {editingId === item._id ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={editUrl}
                          onChange={(e) => setEditUrl(e.target.value)}
                          className="bg-gray-800 text-white px-2 py-1 rounded text-sm flex-1"
                        />
                        <button
                          onClick={() => handleSaveEdit(item.shortLink)}
                          className="text-green-400 text-xs px-2 py-1 bg-green-900/30 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="text-gray-400 text-xs px-2 py-1 bg-gray-900/30 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-300 text-sm truncate">
                        {item.originalLink}
                      </span>
                    )}
                  </div>
                  <div className="hidden md:grid md:col-span-1 text-white">
                    {item.clicks}
                  </div>
                  <div className="hidden md:flex md:col-span-1 justify-end space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-400 hover:text-blue-300 p-2 rounded-lg hover:bg-blue-900/30 cursor-pointer"
                      title="Edit"
                      disabled={editingId === item._id}
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.shortLink)}
                      className="text-red-400 hover:text-red-300 p-2 rounded-lg cursor-pointer hover:bg-red-900/30"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-400">
                No links found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryTable;
