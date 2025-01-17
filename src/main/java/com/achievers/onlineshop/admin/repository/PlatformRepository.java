package com.achievers.onlineshop.admin.repository;

import com.achievers.onlineshop.admin.model.Platform;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlatformRepository extends JpaRepository<Platform, Long> {
}
