import React from "react";
import ProfileLayout from "../../components/profileComponents/ProfileLayout";
import PortfolioForm from "../../components/profileComponents/PortfolioForm";
export default function index() {
  return (
    <ProfileLayout>
      <PortfolioForm />
    </ProfileLayout>
  );
}