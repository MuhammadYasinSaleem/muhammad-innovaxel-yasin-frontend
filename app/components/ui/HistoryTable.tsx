import { useState, useEffect } from "react";
import {
  Edit2,
  Trash2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface LinkHistory {
  _id: string;
  shortLink: string;
  originalLink: string;
  qrCode: string;
  clicks: number;
  status: "active" | "inactive" | "expired";
  createdAt: Date;
  updatedAt: Date;
}

const HistoryTable = () => {
  const [data, setData] = useState<LinkHistory[]>([]);
  const [filteredData, setFilteredData] = useState<LinkHistory[]>([]);
  // Filter logic removed
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mockData: LinkHistory[] = [
          {
            _id: "1",
            shortLink: "shrt.ly/abc123",
            originalLink:
              "https://example.com/very/long/url/that/needs/to/be/shortened",
            qrCode: "/qr-codes/abc123.png",
            clicks: 42,
            status: "active",
            createdAt: new Date("2023-05-15"),
            updatedAt: new Date("2023-05-15"),
          },
          {
            _id: "2",
            shortLink: "shrt.ly/def456",
            originalLink: "https://another-example.com/long/path/to/resource",
            qrCode: "/qr-codes/def456.png",
            clicks: 18,
            status: "inactive",
            createdAt: new Date("2023-06-20"),
            updatedAt: new Date("2023-06-22"),
          },
          {
            _id: "3",
            shortLink: "shrt.ly/ghi789",
            originalLink: "https://third-example.com/even/longer/url/here",
            qrCode: "/qr-codes/ghi789.png",
            clicks: 75,
            status: "expired",
            createdAt: new Date("2023-04-10"),
            updatedAt: new Date("2023-07-01"),
          },
        ];

        setData(mockData);
        setFilteredData(mockData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Filter logic removed

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

  const handleDelete = async (id: string) => {
    try {
      setData(data.filter((item) => item._id !== id));
      alert("Entry deleted successfully");
    } catch (error) {
      console.error("Error deleting entry:", error);
      alert("Failed to delete entry");
    }
  };

  const handleEdit = (id: string) => {
    console.log("Edit entry with id:", id);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto p-4 !text-white">
      <div className="bg-inherit flex items-center justify-between p-4">
        <h2 className="text-2xl font-bold">History ({filteredData.length})</h2>
      </div>
      <div className="overflow-x-auto">
        <div className="bg-[#0d1117] rounded-lg overflow-hidden shadow-lg">
          {/* Grid Headers - Desktop */}
          <div className="hidden md:grid grid-cols-8 gap-4 p-4 bg-[#181e29] border-b border-[#0f1318]">
            <div
              className="col-span-3 flex items-center cursor-pointer"
              onClick={() => requestSort("shortLink")}
            >
              <span className="text-xs font-medium text-white uppercase">Short Link</span>
              {sortConfig?.key === "shortLink" && (
                sortConfig.direction === "ascending"
                  ? <ChevronUp className="ml-1 w-4 h-4 text-white" />
                  : <ChevronDown className="ml-1 w-4 h-4 text-white" />
              )}
            </div>
            <div
              className="col-span-3 flex items-center cursor-pointer"
              onClick={() => requestSort("originalLink")}
            >
              <span className="text-xs font-medium text-white uppercase">Original Link</span>
              {sortConfig?.key === "originalLink" && (
                sortConfig.direction === "ascending"
                  ? <ChevronUp className="ml-1 w-4 h-4 text-white" />
                  : <ChevronDown className="ml-1 w-4 h-4 text-white" />
              )}
            </div>
            <div
              className="col-span-1 flex items-center cursor-pointer"
              onClick={() => requestSort("clicks")}
            >
              <span className="text-xs font-medium text-white uppercase">Clicks</span>
              {sortConfig?.key === "clicks" && (
                sortConfig.direction === "ascending"
                  ? <ChevronUp className="ml-1 w-4 h-4 text-white" />
                  : <ChevronDown className="ml-1 w-4 h-4 text-white" />
              )}
            </div>
            <div className="col-span-1 flex justify-end">
              <span className="text-xs font-medium text-white uppercase">Actions</span>
            </div>
          </div>

          {/* Grid Items */}
          <div className="divide-y divide-[#0f1318] bg-[#0e131e]">
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <div key={item._id} className="grid grid-cols-1 md:grid-cols-8 gap-4 p-4 hover:bg-[#161b22] transition-colors">
                  {/* Mobile View - Stacked */}
                  <div className="md:hidden space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-400">Short Link</span>
                      <a
                        href={`https://${item.shortLink}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline text-sm"
                      >
                        {item.shortLink}
                      </a>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-400">Original Link</span>
                      <span className="text-gray-300 text-sm truncate max-w-[50%]">
                        {item.originalLink}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-400">Clicks</span>
                      <span className="text-white text-sm">{item.clicks}</span>
                    </div>
                    <div className="flex justify-end space-x-2 pt-2">
                      <button
                        onClick={() => handleEdit(item._id)}
                        className="text-blue-400 hover:text-blue-300 p-1 rounded hover:bg-blue-900/30"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-900/30"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Desktop View */}
                  <div className="hidden md:grid md:col-span-3">
                    <a
                      href={`https://${item.shortLink}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 hover:underline truncate"
                    >
                      {item.shortLink}
                    </a>
                  </div>
                  <div className="hidden md:grid md:col-span-3">
                    <span className="text-gray-300 text-sm truncate">
                      {item.originalLink}
                    </span>
                  </div>
                  <div className="hidden md:grid md:col-span-1 text-white">
                    {item.clicks}
                  </div>
                  <div className="hidden md:flex md:col-span-1 justify-end space-x-2">
                    <button
                      onClick={() => handleEdit(item._id)}
                      className="text-blue-400 hover:text-blue-300 p-2 rounded-lg hover:bg-blue-900/30 cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
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
