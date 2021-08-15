import { api } from "../api";

export const FETCH_CATEGORY_VALUES = "FETCH_CATEGORY_VALUES";
export const FETCH_SUBCATEGORY_VALUES = "FETCH_SUBCATEGORY_VALUES";
export const FETCH_PRODUCT_VALUES = "FETCH_PRODUCT_VALUES";
export const FETCH_CAMPAIGN_VALUES = "FETCH_CAMPAIGN_VALUES";
export const FETCH_CATEGORY_SUB_CAT_VALUES = "FETCH_CATEGORY_SUB_CAT_VALUES";
export const FETCH_CAMPAIGN_PRODUCT_VALUES = "FETCH_CAMPAIGN_PRODUCT_VALUES";
export const ADD_CATEGORY_CLICK = "ADD_CATEGORY_CLICK";
export const ADD_CATEGORY_SUCCESS = "ADD_CATEGORY_SUCCESS";
export const ADD_CATEGORY_FAILED = "ADD_CATEGORY_FAILED";
export const ADD_SUBCATEGORY_CLICK = "ADD_SUBCATEGORY_CLICK";
export const ADD_SUBCATEGORY_SUCCESS = "ADD_SUBCATEGORY_SUCCESS";
export const ADD_SUBCATEGORY_FAILED = "ADD_SUBCATEGORY_FAILED";
export const ADD_PRODUCT_CLICK = "ADD_PRODUCT_CLICK";
export const ADD_PRODUCT_SUCCESS = "ADD_PRODUCT_SUCCESS";
export const ADD_PRODUCT_FAILED = "ADD_PRODUCT_FAILED";
export const ADD_CAMPAIGN_CLICK = "ADD_CAMPAIGN_CLICK";
export const ADD_CAMPAIGN_SUCCESS = "ADD_CAMPAIGN_SUCCESS";
export const ADD_CAMPAIGN_FAILED = "ADD_CAMPAIGN_FAILED";
export const EDIT_CATEGORY_CLICK = "EDIT_CATEGORY_CLICK";
export const EDIT_CATEGORY_SUCCESS = "EDIT_CATEGORY_SUCCESS";
export const EDIT_CATEGORY_FAILED = "EDIT_CATEGORY_FAILED";
export const EDIT_SUBCATEGORY_CLICK = "EDIT_SUBCATEGORY_CLICK";
export const EDIT_SUBCATEGORY_SUCCESS = "EDIT_SUBCATEGORY_SUCCESS";
export const EDIT_SUBCATEGORY_FAILED = "EDIT_SUBCATEGORY_FAILED";
export const EDIT_PRODUCT_CLICK = "EDIT_PRODUCT_CLICK";
export const EDIT_PRODUCT_SUCCESS = "EDIT_PRODUCT_SUCCESS";
export const EDIT_PRODUCT_FAILED = "EDIT_PRODUCT_FAILED";
export const EDIT_CAMPAIGN_CLICK = "EDIT_CAMPAIGN_CLICK";
export const EDIT_CAMPAIGN_SUCCESS = "EDIT_CAMPAIGN_SUCCESS";
export const EDIT_CAMPAIGN_FAILED = "EDIT_CAMPAIGN_FAILED";
export const DELETE_CATEGORY_CLICK = "DELETE_CATEGORY_CLICK";
export const DELETE_CATEGORY_SUCCESS = "DELETE_CATEGORY_SUCCESS";
export const DELETE_CATEGORY_FAILED = "DELETE_CATEGORY_FAILED";
export const DELETE_SUBCATEGORY_CLICK = "DELETE_SUBCATEGORY_CLICK";
export const DELETE_SUBCATEGORY_SUCCESS = "DELETE_SUBCATEGORY_SUCCESS";
export const DELETE_SUBCATEGORY_FAILED = "DELETE_SUBCATEGORY_FAILED";
export const DELETE_PRODUCT_CLICK = "DELETE_PRODUCT_CLICK";
export const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS";
export const DELETE_PRODUCT_FAILED = "DELETE_PRODUCT_FAILED";
export const DELETE_CAMPAIGN_CLICK = "DELETE_CAMPAIGN_CLICK";
export const DELETE_CAMPAIGN_SUCCESS = "DELETE_CAMPAIGN_SUCCESS";
export const DELETE_CAMPAIGN_FAILED = "DELETE_CAMPAIGN_FAILED";

export const fetchCategories = () => {
  return (dispatch) => {
    api()
      .get("/categories")
      .then((response) => {
        dispatch({
          type: FETCH_CATEGORY_VALUES,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const fetchSubCategories = () => {
  return (dispatch) => {
    api()
      .get("/sub-categories")
      .then((response) => {
        dispatch({
          type: FETCH_SUBCATEGORY_VALUES,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const fetchProducts = () => {
  return (dispatch) => {
    api()
      .get("/products")
      .then((response) => {
        dispatch({
          type: FETCH_PRODUCT_VALUES,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const fetchCampaigns = () => {
  return (dispatch) => {
    api()
      .get("/campaigns")
      .then((response) => {
        dispatch({
          type: FETCH_CAMPAIGN_VALUES,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const fetchCatsSubCats = (catId) => {
  return (dispatch) => {
    api()
      .get(`/sub-categories-cat/${catId}}`)
      .then((response) => {
        dispatch({
          type: FETCH_CATEGORY_SUB_CAT_VALUES,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const fetchCampaignsProducts = (campaignId) => {
  return (dispatch) => {
    api()
      .get(`/campaign-product/${campaignId}`)
      .then((response) => {
        dispatch({
          type: FETCH_CAMPAIGN_PRODUCT_VALUES,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addCategory = (categoryFormData) => {
  return (dispatch) => {
    dispatch({
      type: ADD_CATEGORY_CLICK,
    });

    api()
      .post("/categories", categoryFormData, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then((response) => {
        dispatch({
          type: ADD_CATEGORY_SUCCESS,
          payload: { data: response.data, redirectUrl: "/categories" },
        });
      })
      .catch((err) => {
        dispatch({
          type: ADD_CATEGORY_FAILED,
        });
      });
  };
};

export const addSubCategory = (subCategoryValues) => {
  return (dispatch) => {
    dispatch({
      type: ADD_SUBCATEGORY_CLICK,
    });

    api()
      .post("/sub-categories", subCategoryValues)
      .then((response) => {
        dispatch({
          type: ADD_SUBCATEGORY_SUCCESS,
          payload: { data: response.data, redirectUrl: "/sub-categories" },
        });
      })
      .catch((err) => {
        dispatch({
          type: ADD_SUBCATEGORY_FAILED,
        });
      });
  };
};

export const addProduct = (productFormData) => {
  return (dispatch) => {
    dispatch({
      type: ADD_PRODUCT_CLICK,
    });

    api()
      .post("/products", productFormData, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then((response) => {
        dispatch({
          type: ADD_PRODUCT_SUCCESS,
          payload: { data: response.data, redirectUrl: "/products" },
        });
      })
      .catch((err) => {
        dispatch({
          type: ADD_PRODUCT_FAILED,
        });
      });
  };
};

export const addCampaign = (campaignFormData) => {
  return (dispatch) => {
    dispatch({
      type: ADD_CAMPAIGN_CLICK,
    });

    api()
      .post("/campaigns", campaignFormData, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then((response) => {
        dispatch({
          type: ADD_CAMPAIGN_SUCCESS,
          payload: { data: response.data, redirectUrl: "/campaigns" },
        });
      })
      .catch((err) =>
        dispatch({
          type: ADD_CAMPAIGN_FAILED,
        })
      );
  };
};

export const editCategory = (catID, categoryFormData) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_CATEGORY_CLICK,
    });

    api()
      .put(`/category/${catID}`, categoryFormData, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then((response) => {
        dispatch({
          type: EDIT_CATEGORY_SUCCESS,
          payload: { data: response.data, redirectUrl: "/categories" },
        });
      })
      .catch((err) => {
        dispatch({
          type: EDIT_CATEGORY_FAILED,
        });
      });
  };
};

export const editSubCategory = (subCatID, subCategoryValues) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_SUBCATEGORY_CLICK,
    });

    api()
      .put(`/sub-categories/${subCatID}`, subCategoryValues)
      .then((response) => {
        dispatch({
          type: EDIT_SUBCATEGORY_SUCCESS,
          payload: { data: response.data, redirectUrl: "/sub-categories" },
        });
      })
      .catch((err) => {
        dispatch({
          type: EDIT_SUBCATEGORY_FAILED,
        });
      });
  };
};

export const editProduct = (productID, productFormData) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_PRODUCT_CLICK,
    });

    api()
      .put(`/products/${productID}`, productFormData, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then((response) => {
        dispatch({
          type: EDIT_PRODUCT_SUCCESS,
          payload: { data: response.data, redirectUrl: "/products" },
        });
      })
      .catch((err) => {
        dispatch({
          type: EDIT_PRODUCT_FAILED,
        });
      });
  };
};

export const editCampaign = (campaignID, campaignFormData) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_CAMPAIGN_CLICK,
    });

    api()
      .put(`/campaigns/${campaignID}`, campaignFormData, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then((response) => {
        dispatch({
          type: EDIT_CAMPAIGN_SUCCESS,
          payload: { data: response.data, redirectUrl: "/campaigns" },
        });
      })
      .catch((err) =>
        dispatch({
          type: EDIT_CAMPAIGN_FAILED,
        })
      );
  };
};

export const deleteCategory = (categoryId) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_CATEGORY_CLICK,
    });

    api()
      .delete(`/categories/${categoryId}`)
      .then(() => {
        dispatch({
          type: DELETE_CATEGORY_SUCCESS,
          payload: categoryId
        })
      })
      .catch((err) => dispatch({
        type: DELETE_CATEGORY_FAILED
      }))
  }
}

export const deleteSubCategory = (subCategoryId) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_SUBCATEGORY_CLICK,
    });

    api()
      .delete(`/sub-categories/${subCategoryId}`)
      .then(() => {
        dispatch({
          type: DELETE_SUBCATEGORY_SUCCESS,
          payload: subCategoryId
        })
      })
      .catch((err) => dispatch({
        type: DELETE_SUBCATEGORY_FAILED
      }))
  }
}

export const deleteProduct = (productId) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_PRODUCT_CLICK,
    });

    api()
      .delete(`/products/${productId}`)
      .then(() => {
        dispatch({
          type: DELETE_PRODUCT_SUCCESS,
          payload: productId
        })
      })
      .catch((err) => dispatch({
        type: DELETE_PRODUCT_FAILED
      }))
  }
}

export const deleteCampaign = (campaignId) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_CAMPAIGN_CLICK,
    });

    api()
      .delete(`/campaigns/${campaignId}`)
      .then(() => {
        dispatch({
          type: DELETE_CAMPAIGN_SUCCESS,
          payload: campaignId
        })
      })
      .catch((err) => dispatch({
        type: DELETE_CAMPAIGN_FAILED
      }))
  }
}