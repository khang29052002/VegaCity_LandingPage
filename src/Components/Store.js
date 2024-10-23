import React, { useState, useEffect } from "react";
import {
  MapPin,
  Phone,
  Clock,
  Search,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";

const API_KEY = "5f728deb-b2c3-4bac-9d9c-41a11e0acccc";
const BASE_URL = "https://api.vegacity.id.vn/api/v1";

const Store = () => {
  const [stores, setStores] = useState([]);
  const [selectedZone, setSelectedZone] = useState("");
  const [selectedStore, setSelectedStore] = useState("");
  const [storeDetails, setStoreDetails] = useState(null);
  const [menus, setMenus] = useState([]);
  const [storesInZone, setStoresInZone] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    fetchStores();
  }, [currentPage]);

  const fetchStores = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${BASE_URL}/stores?apiKey=${API_KEY}&size=10&page=${currentPage}`,
        {
          headers: {
            accept: "text/plain",
          },
        }
      );
      const data = await response.json();
      if (data.data && Array.isArray(data.data)) {
        setStores((prevStores) => [...prevStores, ...data.data]);

        setHasMore(data.data.length === 10);
      }
    } catch (error) {
      console.error("Error fetching stores:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1);
    fetchStores();
  };
  const fetchStoreDetails = async (storeId) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${BASE_URL}/store/${storeId}?apiKey=${API_KEY}`,
        {
          headers: {
            accept: "text/plain",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();

      if (responseData.data && responseData.data.store) {
        const storeData = responseData.data.store;
        const storeZone = stores.find((s) => s.id === storeId)?.zoneName;

        const mappedStoreDetails = {
          name: storeData.name || "N/A",
          address: storeData.address || "N/A",
          phoneNumber: storeData.phoneNumber || "N/A",
          zoneName: storeData.zoneName || storeZone || "N/A",
          description: storeData.description,
          status: storeData.status,
        };

        setStoreDetails(mappedStoreDetails);

        if (
          storeData.menus &&
          storeData.menus[0] &&
          storeData.menus[0].menuJson
        ) {
          try {
            let menuItems = JSON.parse(storeData.menus[0].menuJson);
            if (Array.isArray(menuItems)) {
              menuItems = menuItems.map((item) => ({
                name: item.Name || "",
                price: item.Price || 0,
                image: item.ImgUrl || "/placeholder-image.jpg",
              }));
              setMenus(menuItems);
            } else {
              setMenus([]);
            }
          } catch (error) {
            console.error("Error parsing menu JSON:", error);
            setMenus([]);
          }
        } else {
          setMenus([]);
        }
      }
    } catch (error) {
      console.error("Error fetching store details:", error);
      setStoreDetails(null);
      setMenus([]);
    } finally {
      setLoading(false);
    }
  };

  const handleZoneChange = (event) => {
    const zoneName = event.target.value;
    setSelectedZone(zoneName);
    setSelectedStore("");
    setStoreDetails(null);
    setMenus([]);
    setShowMenu(false);

    const filteredStores = stores.filter(
      (store) => store.zoneName === zoneName
    );
    setStoresInZone(filteredStores);
  };

  const handleStoreChange = async (event) => {
    const storeId = event.target.value;
    setSelectedStore(storeId);
    setShowMenu(false);

    if (storeId) {
      await fetchStoreDetails(storeId);
    } else {
      setStoreDetails(null);
      setMenus([]);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const zones = [...new Set(stores.map((store) => store.zoneName))].filter(
    Boolean
  );

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="hero">
        <div className="container">
          <h1 className="hero-title">Khám Phá Ẩm Thực Xung Quanh Bạn</h1>
          <p className="hero-description">
            Tìm kiếm và đặt chỗ tại những nhà hàng tuyệt vời trong khu vực của
            bạn
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container">
        {/* Search Card */}
        <div className="card">
          <div className="card-header">
            <h2 className="section-title">Tìm Kiếm Nhà Hàng</h2>
          </div>
          <div className="card-content">
            <div className="search-grid">
              {/* Zone Selection */}
              <div className="form-group">
                <label className="form-label">Chọn Khu Vực</label>
                <div className="select-wrapper">
                  <MapPin size={20} />
                  <select value={selectedZone} onChange={handleZoneChange}>
                    <option value="">Tất cả khu vực</option>
                    {zones.map((zoneName) => (
                      <option key={zoneName} value={zoneName}>
                        {zoneName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Store Selection */}
              {selectedZone && storesInZone.length > 0 && (
                <div className="form-group">
                  <label className="form-label">Chọn Nhà Hàng</label>
                  <div className="select-wrapper">
                    <Search size={20} />
                    <select value={selectedStore} onChange={handleStoreChange}>
                      <option value="">Chọn nhà hàng</option>
                      {storesInZone.map((store) => (
                        <option key={store.id} value={store.id}>
                          {store.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Store Details */}
        {storeDetails && (
          <div className="card">
            <div className="card-header">
              <h2 className="store-title">{storeDetails.name}</h2>
            </div>
            <div className="card-content">
              <div className="store-details-grid">
                <div className="store-info">
                  <div className="info-item">
                    <MapPin size={20} />
                    <span>{storeDetails.address}</span>
                  </div>
                  <div className="info-item">
                    <Phone size={20} />
                    <span>{storeDetails.phoneNumber}</span>
                  </div>
                  <div className="info-item">
                    <Clock size={20} />
                    <span>
                      {storeDetails.status ? "Đang mở cửa" : "Đã đóng cửa"}
                    </span>
                  </div>
                </div>
                <div className="store-description">
                  {menus.length > 0 && (
                    <button onClick={toggleMenu} className="menu-button">
                      <Menu size={20} />
                      {showMenu ? "Ẩn Menu" : "Xem Menu"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Menu Items */}
        {showMenu && menus.length > 0 && (
          <div className="card">
            <div className="card-header">
              <h2 className="section-title">Menu</h2>
            </div>
            <div className="card-content">
              <div className="menu-grid">
                {menus.map((menu, index) => (
                  <div key={index} className="menu-item">
                    <img src={menu.image} alt={menu.name} />
                    <h3 className="menu-item-title">{menu.name}</h3>
                    <p className="menu-item-price">
                      {menu.price.toLocaleString()}đ
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {/* Load More Button */}
        {hasMore && (
          <div className="load-more-container">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className={`load-more-button ${loading ? "loading" : ""}`}
            >
              {loading && <Loader2 className="loader-icon" />}
              {loading ? "Đang tải..." : "Tải thêm"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Store;
