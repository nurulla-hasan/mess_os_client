import { Users, Utensils, CreditCard, CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import PageLayout from "@/components/ui/custom/page-layout";

export default function GetStartedPage() {
  return (
    <>
      <PageLayout paddingSize="small">
        {/* Hero Header Section */}
        <div className="relative text-center space-y-4 mb-16">
          {/* Decorative background element */}
          <div className="absolute inset-0 -z-10 flex items-center justify-center">
            <div className="w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          </div>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Welcome to Mess OS</span>
          </div>
          
          <DashboardPageHeader
            title="Get Started"
            description="Create your mess or join an existing one to begin managing meals and expenses"
          />
        </div>

        {/* Main Cards Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20">
          {/* Join a Mess Card */}
          <Card className="group relative overflow-hidden transition-all duration-500 hover:shadow-lg hover:scale-[1.02] cursor-pointer border-2 border-transparent hover:border-primary/20">
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <CardContent className="relative flex flex-col gap-8 p-8">
              <div className="flex items-start gap-5">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-primary/20 to-primary/10 group-hover:scale-110 transition-transform duration-500">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors duration-300">Join a Mess</h2>
                  <p className="text-sm text-muted-foreground mt-2">
                    Connect with existing communities
                  </p>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed text-base">
                Join an existing mess using an invite code or request approval from mess managers. Perfect for members looking to connect.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button asChild size="lg" className="group/btn">
                  <a href="/join-mess" className="gap-2">
                    Join with Code
                    <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="/browse-mess">Browse Mess</a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Create a Mess Card */}
          <Card className="group relative overflow-hidden transition-all duration-500 hover:shadow-lg hover:scale-[1.02] cursor-pointer border-2 border-transparent hover:border-primary/20">
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <CardContent className="relative flex flex-col gap-8 p-8">
              <div className="flex items-start gap-5">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-primary/20 to-primary/10 group-hover:scale-110 transition-transform duration-500">
                  <Utensils className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors duration-300">Create a Mess</h2>
                  <p className="text-sm text-muted-foreground mt-2">
                    Start your own community
                  </p>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed text-base">
                Start your own mess and manage members, meals, and expenses with powerful tools. Ideal for managers.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button asChild size="lg" className="group/btn">
                  <a href="/create-mess" className="gap-2">
                    Create Mess
                    <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How it works Section */}
        <div className="relative">
          {/* Section header */}
          <div className="text-center space-y-3 mb-10">
            <h3 className="text-2xl font-bold">How it works</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Simple steps to manage your mess efficiently and effortlessly
            </p>
          </div>

          {/* Steps grid with connecting line on desktop */}
          <div className="relative">
            {/* Connecting line for desktop */}
            <div className="hidden lg:block absolute top-1/2 left-[16.67%] right-[16.67%] h-0.5 bg-linear-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2" />
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative">
              {/* Step 1 */}
              <Card className="group relative transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <CardContent className="flex flex-col items-center text-center gap-5 py-10">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-colors" />
                    <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-linear-to-br from-primary to-primary/80 text-primary-foreground shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Users className="h-6 w-6" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-secondary text-secondary-foreground text-xs font-bold flex items-center justify-center border-2 border-background">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Add members</h4>
                    <p className="text-sm text-muted-foreground">
                      Invite members to your mess
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Step 2 */}
              <Card className="group relative transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <CardContent className="flex flex-col items-center text-center gap-5 py-10">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-colors" />
                    <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-linear-to-br from-primary to-primary/80 text-primary-foreground shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <CreditCard className="h-6 w-6" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-secondary text-secondary-foreground text-xs font-bold flex items-center justify-center border-2 border-background">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Track expenses</h4>
                    <p className="text-sm text-muted-foreground">
                      Manage bazaar and deposits
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Step 3 */}
              <Card className="group relative transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <CardContent className="flex flex-col items-center text-center gap-5 py-10">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-colors" />
                    <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-linear-to-br from-primary to-primary/80 text-primary-foreground shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-secondary text-secondary-foreground text-xs font-bold flex items-center justify-center border-2 border-background">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Calculate automatically</h4>
                    <p className="text-sm text-muted-foreground">
                      Smart monthly calculations
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}
