@component('mail::message')
# Booking Rejected

Hi {{ $booking->user->name }},

We’re sorry. Your booking for **{{ $booking->service->name }}** has been rejected.

You can try booking another service at any time.

@endcomponent
