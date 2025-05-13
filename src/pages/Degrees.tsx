
import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { DegreeCard } from "@/components/DegreeCard";
import { degrees } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Degrees = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [filteredDegrees, setFilteredDegrees] = useState(degrees);

  // Get unique categories from degrees
  const categories = Array.from(new Set(degrees.map((degree) => degree.category)));

  // Filter degrees when search term or category changes
  useEffect(() => {
    const filtered = degrees.filter((degree) => {
      const matchesSearch = degree.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        degree.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === "" || degree.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
    setFilteredDegrees(filtered);
  }, [searchTerm, categoryFilter]);

  return (
    <Layout>
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Explore Degree Programs
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Discover various degree options available after your PUC and find the right path for your future.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-2">
                <Input
                  type="text"
                  placeholder="Search for degree programs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <Select
                  value={categoryFilter}
                  onValueChange={(value) => setCategoryFilter(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {filteredDegrees.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredDegrees.map((degree) => (
                <DegreeCard key={degree.id} degree={degree} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">No matching degree programs found.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Degrees;
