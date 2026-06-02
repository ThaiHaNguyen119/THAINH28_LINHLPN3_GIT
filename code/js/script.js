// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    initializeMenuHandler();
    initializeInteractivity();
});

// Handle sidebar menu clicks
function initializeMenuHandler() {
    const menuLinks = document.querySelectorAll('.sidebar-menu a');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            menuLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
        });
    });
}

// Add interactive features
function initializeInteractivity() {
    // Button interactions
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            showNotification(`Action: ${this.textContent.trim()}`);
        });
    });

    // Action buttons in tables
    const actionButtons = document.querySelectorAll('.btn-action');
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const row = this.closest('tr');
            const studentName = row.querySelector('td:nth-child(2)')?.textContent || 'Student';
            showNotification(`Viewing details for: ${studentName}`);
        });
    });

    // Status badges hover effect
    const statusBadges = document.querySelectorAll('.status');
    statusBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Table row hover
    const tableRows = document.querySelectorAll('table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#ecf0f1';
        });
    });
}

// Notification system
function showNotification(message) {
    // Check if notification already exists
    let notification = document.querySelector('.notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'notification';
        document.body.appendChild(notification);
        
        // Add notification styles if not already in CSS
        if (!document.querySelector('style.notification-styles')) {
            const style = document.createElement('style');
            style.className = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background: white;
                    padding: 16px 24px;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    z-index: 1000;
                    animation: slideIn 0.3s ease-out;
                    color: #2c3e50;
                    font-weight: 500;
                    max-width: 300px;
                    border-left: 4px solid #3498db;
                }
                
                @keyframes slideIn {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slideOut {
                    to {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    notification.textContent = message;
    notification.style.animation = 'slideIn 0.3s ease-out';

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Re-initialize icons when DOM changes
function reinitializeIcons() {
    lucide.createIcons();
}

// Export functions for potential external use
window.AppUtils = {
    showNotification,
    reinitializeIcons
};
